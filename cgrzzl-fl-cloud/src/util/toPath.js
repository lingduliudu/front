import routePath from '../const/routerPath.json'
function translate (val) {
  for(var i of routePath.Path){
    if (i.path === val) {
      return 2
    }
  }
  return 1
}

export default translate