import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources/latest";
import * as storage from "@pulumi/azure-native/storage/latest";
import { containerName } from "./config";

const resourceGroup = new resources.ResourceGroup("my-group", {
    resourceGroupName: "my-group",
    location: "westus",
});

const storageAccount = new storage.StorageAccount("mystorage", {
    resourceGroupName: resourceGroup.name,
    accountName: "myuniquename",
    location: resourceGroup.location,
    sku: {
        name: "Standard_LRS",
    },
    kind: "StorageV2",
});

const container = new storage.BlobContainer("mycontainer", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    containerName: containerName,
});

export const accountName = storageAccount.name;
