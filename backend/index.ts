console.log("Hello via Bun!");// server.ts — Serum Mock API  (bun run server.ts)
import { serve } from "bun";

// ── State ────────────────────────────────────────────────────────────────────
interface Knob { value: number }            // 0–1
interface OscState {
  enabled: boolean;
  waveType: string;
  wtPos: number; fine: number; semi: number; oct: number;
  level: number; pan: number; phase: number; rand: number;
  uni: number; det: number; blend: number;
}
interface FilterState {
  enabled: boolean; type: string; slope: string;
  cutoff: number; res: number; drive: number; mix: number;
}
interface EnvState  { atk:number; dec:number; sus:number; rel:number; lvl:number; mode:string }
interface LfoState  { rate:number; amt:number; phase:number; rise:number; mode:string }
interface VoiceState{ glide:number; det:number; voices:number; legato:boolean; retrig:boolean }
interface ModEntry  { src:string; dst:string; amount:number }

interface SynthState {
  oscA: OscState; oscB: OscState;
  sub: { enabled:boolean; wave:string; level:number; pan:number };
  noise: { pitch:number; level:number; pan:number };
  filter: FilterState;
  env1: EnvState; env2: EnvState;
  lfo1: LfoState; lfo2: LfoState;
  voice: VoiceState;
  matrix: ModEntry[];
  master: { volume:number; pan:number; tune:number };
  preset: string;
}

let state: SynthState = {
  oscA: { enabled:true, waveType:"WT", wtPos:0.32, fine:0.5, semi:0.5, oct:0.5, level:0.76, pan:0.5, phase:0.38, rand:0, uni:0, det:0.18, blend:0.5 },
  oscB: { enabled:true, waveType:"SAW", wtPos:0.44, fine:0.5, semi:0.5, oct:0.5, level:0.60, pan:0.5, phase:0.5, rand:0, uni:0, det:0.18, blend:0.5 },
  sub:  { enabled:true, wave:"SIN", level:0.58, pan:0.5 },
  noise:{ pitch:0.5, level:0.3, pan:0.5 },
  filter:{ enabled:true, type:"LP", slope:"24", cutoff:0.60, res:0.44, drive:0.28, mix:0.82 },
  env1: { atk:0.08, dec:0.2, sus:0.68, rel:0.28, lvl:0.9, mode:"EXP" },
  env2: { atk:0.12, dec:0.3, sus:0.5,  rel:0.4,  lvl:0.8, mode:"LIN" },
  lfo1: { rate:0.3, amt:0.65, phase:0.5, rise:0.18, mode:"SYNC" },
  lfo2: { rate:0.55, amt:0.4, phase:0, rise:0, mode:"TRIG" },
  voice:{ glide:0.1, det:0.18, voices:0.5, legato:false, retrig:true },
  matrix:[
    { src:"ENV 1", dst:"CUTOFF", amount:0.65 },
    { src:"ENV 1", dst:"OSC B",  amount:0.4  },
    { src:"ENV 2", dst:"RES",    amount:0.35 },
    { src:"LFO 1", dst:"CUTOFF", amount:0.45 },
    { src:"LFO 1", dst:"OSC A",  amount:0.3  },
    { src:"LFO 2", dst:"OSC A",  amount:0.55 },
    { src:"VEL",   dst:"RES",    amount:0.4  },
    { src:"NOTE",  dst:"CUTOFF", amount:0.3  },
  ],
  master:{ volume:0.75, pan:0.5, tune:0.5 },
  preset:"TG Gravity Motion",
};

const PRESETS: Record<string, Partial<SynthState>> = {
  "TG Gravity Motion": { master:{ volume:0.75, pan:0.5, tune:0.5 } },
  "Pluck Lead":    { filter:{ ...state.filter, cutoff:0.82, res:0.22, type:"LP", slope:"12", drive:0.1, mix:1, enabled:true }, env1:{ atk:0.02, dec:0.12, sus:0.0, rel:0.18, lvl:1.0, mode:"EXP" } },
  "Pad Evolve":    { filter:{ ...state.filter, cutoff:0.44, res:0.36, type:"LP", slope:"24", drive:0.2, mix:0.9, enabled:true }, env1:{ atk:0.72, dec:0.5,  sus:0.8, rel:0.88, lvl:0.85, mode:"LIN" } },
  "Bass Growl":    { filter:{ ...state.filter, cutoff:0.35, res:0.65, type:"LP", slope:"24", drive:0.72, mix:1, enabled:true }, lfo1:{ rate:0.22, amt:0.7, phase:0, rise:0, mode:"SYNC" } },
  "Arp Crystal":   { oscA:{ ...state.oscA, uni:0.5, det:0.28, blend:0.6 }, filter:{ ...state.filter, cutoff:0.78, res:0.18, type:"HP", slope:"12", drive:0, mix:0.8, enabled:true } },
};

// ── CORS helper ──────────────────────────────────────────────────────────────
function cors(res: Response): Response {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,PATCH,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
function json(data: unknown, status = 200) {
  return cors(new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } }));
}
function err(msg: string, status = 400) { return json({ error: msg }, status); }

// ── deep-merge helper ────────────────────────────────────────────────────────
function merge(target: any, patch: any): any {
  if (typeof patch !== "object" || patch === null) return patch;
  const out = { ...target };
  for (const k of Object.keys(patch))
    out[k] = (typeof target[k] === "object" && !Array.isArray(target[k])) ? merge(target[k], patch[k]) : patch[k];
  return out;
}

// ── Router ───────────────────────────────────────────────────────────────────
serve({
  port: 3001,
  async fetch(req) {
    const url  = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (method === "OPTIONS") return cors(new Response(null, { status: 204 }));

    // GET /state  — full synth state
    if (method === "GET" && path === "/state")
      return json(state);

    // GET /presets  — list preset names
    if (method === "GET" && path === "/presets")
      return json({ current: state.preset, presets: Object.keys(PRESETS) });

    // POST /presets/:name  — load preset
    if (method === "POST" && path.startsWith("/presets/")) {
      const name = decodeURIComponent(path.slice(9));
      if (!PRESETS[name]) return err(`Preset "${name}" not found`, 404);
      state = merge(state, { ...PRESETS[name], preset: name }) as SynthState;
      return json({ ok: true, preset: name, state });
    }

    // PATCH /osc/:id  — update oscA or oscB fields
    if (method === "PATCH" && /^\/osc\/(a|b)$/.test(path)) {
      const key = path.endsWith("/a") ? "oscA" : "oscB";
      const body = await req.json();
      (state as any)[key] = merge((state as any)[key], body);
      return json({ ok: true, [key]: (state as any)[key] });
    }

    // PATCH /filter  — update filter
    if (method === "PATCH" && path === "/filter") {
      const body = await req.json();
      state.filter = merge(state.filter, body);
      return json({ ok: true, filter: state.filter });
    }

    // PATCH /env/:id  — update env1 or env2
    if (method === "PATCH" && /^\/env\/(1|2)$/.test(path)) {
      const key = path.endsWith("/1") ? "env1" : "env2";
      const body = await req.json();
      (state as any)[key] = merge((state as any)[key], body);
      return json({ ok: true, [key]: (state as any)[key] });
    }

    // PATCH /lfo/:id  — update lfo1 or lfo2
    if (method === "PATCH" && /^\/lfo\/(1|2)$/.test(path)) {
      const key = path.endsWith("/1") ? "lfo1" : "lfo2";
      const body = await req.json();
      (state as any)[key] = merge((state as any)[key], body);
      return json({ ok: true, [key]: (state as any)[key] });
    }

    // PATCH /voice  — voice settings
    if (method === "PATCH" && path === "/voice") {
      const body = await req.json();
      state.voice = merge(state.voice, body);
      return json({ ok: true, voice: state.voice });
    }

    // PATCH /master  — master knobs
    if (method === "PATCH" && path === "/master") {
      const body = await req.json();
      state.master = merge(state.master, body);
      return json({ ok: true, master: state.master });
    }

    // PATCH /sub   PATCH /noise
    if (method === "PATCH" && (path === "/sub" || path === "/noise")) {
      const key = path.slice(1) as "sub" | "noise";
      const body = await req.json();
      (state as any)[key] = merge((state as any)[key], body);
      return json({ ok: true, [key]: (state as any)[key] });
    }

    // GET /matrix  — mod matrix
    if (method === "GET" && path === "/matrix")
      return json(state.matrix);

    // PATCH /matrix  — replace full matrix array
    if (method === "PATCH" && path === "/matrix") {
      const body = await req.json();
      if (!Array.isArray(body)) return err("Expected array");
      state.matrix = body;
      return json({ ok: true, matrix: state.matrix });
    }

    return err("Not found", 404);
  },
});

console.log("🎛  Serum API running → http://localhost:3001");
console.log("   GET  /state         full synth state");
console.log("   GET  /presets        list presets");
console.log("   POST /presets/:name  load preset");
console.log("   PATCH /osc/a|b       update oscillator");
console.log("   PATCH /filter        update filter");
console.log("   PATCH /env/1|2       update envelope");
console.log("   PATCH /lfo/1|2       update LFO");
console.log("   PATCH /master        master vol/pan/tune");
console.log("   PATCH /voice         voice settings");
console.log("   PATCH /matrix        mod matrix array");