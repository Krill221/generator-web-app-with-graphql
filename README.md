## This is Yeoman generator for fast creation web-app with:
- React
- ApolloClient
- Graphql
- Material-ui
### It generates web app with authorization
### It is fully compatible with this server side:
```
npm i generator-apollo-server-with-mongodb
```
[https://github.com/Krill221/generator-apollo-server-with-mongodb](https://github.com/Krill221/generator-apollo-server-with-mongodb)

## Get started:
#### To generate new app type in console:
```
npm install -g npm
npm install -g yo
npm install -g  generator-web-app-with-graphql
yo web-app-with-graphql
```
#### than follow instructions
#### To start local server with web-app simply type in console:
```
yarn s
```

## It also has simple generators:
#### To add new model (for example for model "Post") simply type in console:
```
yarn add-model Post name:String desc:String
```
#### To delete model type in console:
```
yarn delete-model Post
```
#### To add new fields to model type in console:
```
yarn add-fields Post body:String img:String
```
#### To delete fields from model type in console:
```
yarn delete-fields Post body:String img:String
```
#### To add new has-many relation field to model type in console:
```
yarn add-has-many Post Comment
```
#### To delete has-many relation field to model type in console:
```
yarn delete-has-many Post Comment
```
#### To add estimates array field to model type in console:
```
yarn add-estimates Post like:Float stars:Float
```
#### To delete estimates array field to model type in console:
```
yarn delete-estimates Post like:Float stars:Float
```

