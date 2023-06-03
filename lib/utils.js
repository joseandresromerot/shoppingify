export const groupBy = (list, property) => {
  return list.reduce((groups, item) => {
    const group = (groups[item[property]] || []);
    group.push(item);
    groups[item[property]] = group;
    return groups;
  }, {});
}