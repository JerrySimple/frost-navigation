/**
 * @description 处理导航链接列表
 * @param {boolean} withAll 是否添加“全部”项
 */
export function formatNavLinks(withAll = false) {

  /** @type {NavLinkItem[]} */
  let list0 = JSON.parse(JSON.stringify(window['NAV_LINK_LIST']));

  /** @type {NavLinkItem[]} */
  let list1 = [];

  let index = 0;

  (function fn(treeData, target) {
    for (let i = 0; i < treeData.length; i++) {

      let {
        title, children, date, desc,
        icon, isInvalid, showOnly, url,
      } = treeData[i];

      /** @type {NavLinkItem} */
      let data = {
        title: (typeof title === 'string' ? title : ''),
        children: [],
        date: (typeof date === 'string' ? date : ''),
        desc: (typeof desc === 'string' ? desc : ''),
        icon: (typeof icon === 'string' ? icon : ''),
        isInvalid: (typeof isInvalid === 'boolean' ? isInvalid : false),
        showOnly: (typeof showOnly === 'boolean' ? showOnly : false),
        url: (typeof url === 'string' ? url : ''),
        _key: `item_${++index}`,
      };

      // 添加项
      target && target.push(data);

      // 递归处理
      if (children) {
        fn(children, data.children);
      } else {
        data.children = null;
      }

    }
  })(list0, list1);

  if (withAll) {
    list1.unshift({
      title: '全部',
      icon: 'mdi mdi-view-grid',
      children: JSON.parse(JSON.stringify(list1)),
    });
  }

  return list1;

}
