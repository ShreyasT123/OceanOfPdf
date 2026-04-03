$rg = "oop-rg"
$location = "centralindia"
$storage = "oopblobstore0"
$container = "oopblob"

# az login

az group create --name $rg --location $location

az storage account create `
  --name $storage `
  --resource-group $rg `
  --location $location `
  --sku Standard_LRS `
  --kind StorageV2

az storage container create `
  --name $container `
  --account-name $storage `
  --auth-mode login

Write-Host "Storage Account: $storage"
Write-Host "Container: $container"