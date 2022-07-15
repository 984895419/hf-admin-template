const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  supportLanguage: state => state.app.supportLanguage,
  size: state => state.app.size,
  title: state => state.app.title,
  helper: state => state.app.helper,
  qywxScan: state => state.app.qywxScan,
  tenantOpen: state => state.app.tenantOpen,
  settingLoader: state => state.app.settingLoader,
  device: state => state.app.device,
  pageSize: state => state.app.pageSize,
  pageSizes: state => state.app.pageSizes,
  isDeveloping: state => state.app.isDeveloping,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  userCode: state => state.user.userCode,
  userId: state => state.user.userId,
  isAdmin: state => state.user.isAdmin,
  companyName: state => state.user.companyName,
  companyId: state => state.user.companyId,
  tenantName: state => state.user.tenantName,
  tenantId: state => state.user.tenantId,
  tenantIds: state => state.user.tenantIds,
  deptName: state => state.user.deptName,
  dept: state => state.user.dept,
  operateList: state => state.user.operateList,
  menuList: state => state.user.menuList,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  addRouters: state => state.permission.addRoutes
}
export default getters
