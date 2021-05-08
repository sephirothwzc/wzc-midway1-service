const { pinyin } = require('pinyin-pro');
const data = [
  {
    id: '1',
    name: '党建工作科',
    type: 'department',
    status: '1',
  },
  {
    id: '2',
    name: '电力煤炭管理科',
    type: 'department',
    status: '1',
  },
  {
    id: '3',
    name: '道路设施科',
    type: 'department',
    status: '1',
  },
  {
    id: '4',
    name: '市政工程建设管理科',
    type: 'department',
    status: '1',
  },
  {
    id: '5',
    name: '交通综合科',
    type: 'department',
    status: '1',
  },
  {
    id: '6',
    name: '供排水管理科',
    type: 'department',
    status: '1',
  },
  {
    id: '7',
    name: '河长制工作科',
    type: 'department',
    status: '1',
  },
  {
    id: '8',
    name: '水务发展规划科',
    type: 'department',
    status: '1',
  },
  {
    id: '9',
    name: '供热管理办公室',
    type: 'department',
    status: '1',
  },
  {
    id: '10',
    name: '固体废弃物管理科',
    type: 'department',
    status: '1',
  },
  {
    id: '11',
    name: '市容环境建设管理科',
    type: 'department',
    status: '1',
  },
  {
    id: '12',
    name: '宣传调研科',
    type: 'department',
    status: '1',
  },
  {
    id: '13',
    name: '法制审批科',
    type: 'department',
    status: '1',
  },
  {
    id: '14',
    name: '行政办公室',
    type: 'department',
    status: '1',
  },
  {
    id: '15',
    name: '会记中心',
    type: 'department',
    status: '1',
  },
];

const roleData = [
  {
    id: '16',
    name: '分管领导',
    code: 'leaderPersonal',
    type: 'role',
    status: '1',
  },
  {
    id: '17',
    name: '主管领导',
    code: 'leaderCharge',
    type: 'role',
    status: '1',
  },
  {
    id: '18',
    name: '主要领导',
    code: 'keyLeaders',
    type: 'role',
    status: '1',
  },
];

const getData = () => {
  const list = [];
  const department = data.map((p) => {
    p.code = pinyin(p.name, { toneType: 'none', type: 'array' }).join('-');
    list.push({
      id: (list.length + 4 + data.length).toString(),
      name: '科长',
      code: 'sectionChief',
      type: 'role',
      parent_id: p.id,
      status: '1',
    });
    list.push({
      id: (list.length + 4 + data.length).toString(),
      name: '职员',
      code: 'staffMember',
      type: 'role',
      parent_id: p.id,
      status: '1',
    });
    return p;
  });
  return { department, role: list, roleData };
};

module.exports = getData;
