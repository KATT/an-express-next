import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Load config
const config = new pulumi.Config();
const project = config.require("project");
const environment = config.require("environment");
const domain = config.get("domain");

// Create an ECS cluster
const cluster = new aws.ecs.Cluster(`${project}-${environment}-cluster`);

// Create an ECR repository for the front and server
const frontRepo = new aws.ecr.Repository(`${project}-front-repo`);
const serverRepo = new aws.ecr.Repository(`${project}-server-repo`);

// Define the task definitions for the services
const frontTask = new aws.ecs.TaskDefinition(`${project}-front-task`, {
    family: `${project}-front`,
    cpu: "512",
    memory: "1024",
    requiresCompatibilities: ["FARGATE"],
    networkMode: "awsvpc",
    executionRoleArn: aws.iam.getRole({ name: "ecsTaskExecutionRole" }).then(role => role.arn),
    containerDefinitions: pulumi.output([
        {
            name: "front",
            image: pulumi.interpolate`${frontRepo.repositoryUrl}:latest`,
            essential: true,
            portMappings: [{ containerPort: 3000 }],
            environment: [{ name: "NODE_ENV", value: "production" }]
        }
    ]).apply(JSON.stringify)
});

const serverTask = new aws.ecs.TaskDefinition(`${project}-server-task`, {
    family: `${project}-server`,
    cpu: "512",
    memory: "1024",
    requiresCompatibilities: ["FARGATE"],
    networkMode: "awsvpc",
    executionRoleArn: aws.iam.getRole({ name: "ecsTaskExecutionRole" }).then(role => role.arn),
    containerDefinitions: pulumi.output([
        {
            name: "server",
            image: pulumi.interpolate`${serverRepo.repositoryUrl}:latest`,
            essential: true,
            portMappings: [{ containerPort: 4000 }],
            environment: [{ name: "NODE_ENV", value: "production" }]
        }
    ]).apply(JSON.stringify)
});

// Create Fargate services
const frontService = new aws.ecs.Service(`${project}-front-service`, {
    cluster: cluster.id,
    taskDefinition: frontTask.arn,
    desiredCount: 2,
    launchType: "FARGATE",
    networkConfiguration: {
        subnets: aws.ec2.getSubnets({}).then(subnets => subnets.ids),
        securityGroups: [],
    }
});

const serverService = new aws.ecs.Service(`${project}-server-service`, {
    cluster: cluster.id,
    taskDefinition: serverTask.arn,
    desiredCount: 2,
    launchType: "FARGATE",
    networkConfiguration: {
        subnets: aws.ec2.getSubnets({}).then(subnets => subnets.ids),
        securityGroups: [],
    }
});

// Output URLs
export const frontUrl = frontService.id;
export const serverUrl = serverService.id;
