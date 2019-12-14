# Docker
- docker-compose
# typescript-react-sass-webpack-babel-boilerplate
This is a basic boilerplate for these technologies:
- TypeScript
- React
- SASS
- Webpack
- Babel

### Setup dev environment
- `docker-compose build`
- `docker-compose up -d`
- `docker-compose exec webapp ash`
- `yarn install`
- `yarn add core-js react react-dom regenerator-runtime`
`yarn add webpack webpack-dev-server --dev`
- `yarn add -D  @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/react @types/react-dom babel-loader css-loader node-sass sass-loader source-map-loader style-loader webpack webpack-cli typescript ts-loader`
- `yarn add webpack webpack-dev-server --dev`
- `yarn run webpack-dev-server -- --inline`
- `yarn run webpack:dev`
- open `http://localhost:8000/`
