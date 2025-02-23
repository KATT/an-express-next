# next-trpc-express

#### Build order

- server :: prisma:generate // builds prisma types into shared
- shared :: build dist // builds shared dist with prisma types
- server :: build dist // builds server dist with shared
- front :: build .output // builds front with shared

#### Clerk

### Pulumi

- install granted and get eth aws setup
- assume pulumi_dev role
- pulumi login
  - pulumi will show in browser (github auth)
- aws: prefer us-east-1