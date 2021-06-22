module.exports = [
  {
    link: 'app-user/list',
    key: 'AppUserList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/app-user/list'), options),
  },
  {
    link: 'app-user/',
    key: 'AppUserAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/app-user/item'), options),
  },
  {
    link: 'app-user/:id',
    key: 'AppUserEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/app-user/item'), options),
  },
  {
    link: 'role/list',
    key: 'RoleList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role/list'), options),
  },
  {
    link: 'role/',
    key: 'RoleAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role/item'), options),
  },
  {
    link: 'role/:id',
    key: 'RoleEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role/item'), options),
  },
  {
    link: 'role-group/list',
    key: 'RoleGroupList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role-group/list'), options),
  },
  {
    link: 'role-group/',
    key: 'RoleGroupAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role-group/item'), options),
  },
  {
    link: 'role-group/:id',
    key: 'RoleGroupEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/role-group/item'), options),
  },
  {
    link: 'router/list',
    key: 'RouterList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/router/list'), options),
  },
  {
    link: 'router/',
    key: 'RouterAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/router/item'), options),
  },
  {
    link: 'router/:id',
    key: 'RouterEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/router/item'), options),
  },
  {
    link: 'permission-configuration/router',
    key: 'RouterConfiguration',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/permission-configuration/router'),
      options
    ),
  },
  {
    link: 'permission-configuration/role',
    key: 'RoleConfiguration',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/permission-configuration/role'),
      options
    ),
  },
  {
    link: 'work-flow/list',
    key: 'WorkFlowList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/work-flow/list'), options),
  },
  {
    link: 'work-flow/',
    key: 'WorkFlowAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/work-flow/item'), options),
  },
  // 修改动态表单（草稿、保存、提交）
  {
    link: 'work-flow-my/dynamic-form/:workflowormuserid/:dataid',
    key: 'DynamicForm',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form-edit'),
      options
    ),
  },
  // 新建动态表单（草稿、保存、提交）
  {
    link: 'work-flow-my/dynamic-form/:formCustomId',
    key: 'DynamicForm',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form'),
      options
    ),
  },
  // 我的草稿（未提交的）
  {
    link: 'work-flow-my/dynamic-form-draft',
    key: 'DynamicFormList',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form-draft'),
      options
    ),
  },
  // 我的申请（我发起的）
  {
    link: 'work-flow-my/dynamic-form-apply',
    key: 'DynamicFormApply',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form-apply'),
      options
    ),
  },
  // 我的审批（待我审批）
  {
    link: 'work-flow-my/dynamic-form-waiting',
    key: 'DynamicFormWaiting',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form-waiting'),
      options
    ),
  },
  {
    link: 'work-flow-my/dynamic-form-draft/:formCustomId',
    key: 'DynamicFormList',
    iconType: 'home',
    exact: true,
    // component: loadable(
      () => import('../views/work-flow/dynamic-render/dynamic-form-draft'),
      options
    ),
  },
  {
    link: 'work-flow/:id',
    key: 'WorkFlowEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/work-flow/item'), options),
  },
  {
    link: 'form-custom/list',
    key: 'FormCustomList',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/form-custom/list'), options),
  },
  {
    link: 'form-custom/',
    key: 'FormCustomAdd',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/form-custom/item'), options),
  },
  {
    link: 'form-custom/:id/design',
    key: 'FormCustomDesign',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/form-custom/design'), options),
  },
  {
    link: 'form-custom/:id',
    key: 'FormCustomEdit',
    iconType: 'home',
    exact: true,
    // component: loadable(() => import('../views/form-custom/item'), options),
  },
  {
    // 预算调拨
    link: 'budget/allocation',
    key: 'budgetAllocation',
    iconType: 'home',
    text: 'budgetAllocation',
    exact: true,
    // component: loadable(() => import('../views/budget/allocation'), options),
  },
  {
    // 新建预算
    link: 'budget/list/add',
    key: 'budgetAdd',
    iconType: 'home',
    text: 'budgetAdd',
    exact: true,
    // component: loadable(() => import('../views/budget/item-edit'), options),
  },
  {
    // 编辑预算
    link: 'budget/list/edit/:id',
    key: 'budgetAdd',
    iconType: 'home',
    text: 'budgetAdd',
    exact: true,
    // component: loadable(() => import('../views/budget/item-edit'), options),
  },
  {
    // 查看预算信息
    link: 'budget/list/info/:id',
    key: 'budgetInfo',
    iconType: 'home',
    text: 'budgetInfo',
    exact: true,
    // component: loadable(() => import('../views/budget/item-info'), options),
  },
  {
    // 预算列表
    link: 'budget/list',
    key: 'budgetList',
    iconType: 'home',
    text: 'budgetList',
    exact: false,
    // component: loadable(() => import('../views/budget/list'), options),
  },
  {
    // 新增项目
    link: 'project/list/add',
    key: 'projectAdd',
    iconType: 'home',
    text: 'projectAdd',
    exact: false,
    // component: loadable(() => import('../views/project/item-edit'), options),
  },
  {
    // 编辑项目
    link: 'project/list/edit/:id',
    key: 'projectEdit',
    iconType: 'home',
    text: 'projectEdit',
    exact: false,
    // component: loadable(() => import('../views/project/item-edit'), options),
  },
  {
    // 查看项目
    link: 'project/list/info/:id',
    key: 'projectInfo',
    iconType: 'home',
    text: 'projectInfo',
    exact: false,
    // component: loadable(() => import('../views/project/item-info'), options),
  },
  {
    // 项目列表
    link: 'project/list',
    key: 'projectList',
    iconType: 'home',
    text: 'projectList',
    exact: false,
    // component: loadable(() => import('../views/project/list'), options),
  },
  {
    // 新增项目组
    link: 'project-group/list/add',
    key: 'projectAdd',
    iconType: 'home',
    text: 'projectAdd',
    exact: false,
    // component: loadable(
      () => import('../views/project-group/item-edit'),
      options
    ),
  },
  {
    // 编辑项目组
    link: 'project-group/list/edit/:id',
    key: 'projectEdit',
    iconType: 'home',
    text: 'projectEdit',
    exact: false,
    // component: loadable(
      () => import('../views/project-group/item-edit'),
      options
    ),
  },
  {
    // 查看项目组
    link: 'project-group/list/info/:id',
    key: 'projectInfo',
    iconType: 'home',
    text: 'projectInfo',
    exact: false,
    // component: loadable(
      () => import('../views/project-group/item-info'),
      options
    ),
  },
  {
    // 项目组列表
    link: 'project-group/list',
    key: 'projectList',
    iconType: 'home',
    text: 'projectList',
    exact: false,
    // component: loadable(() => import('../views/project-group/list'), options),
  },
];
