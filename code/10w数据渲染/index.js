const getList = () => {
  return new Promise((resolve, reject) => {

  });
}

//  17s
// const renderList = async () => {
//   console.time('列表时间开始');
//   const list = await getList();
//   list.forEach(item => {
//     const div = document.createElement('div');
//     div.className = 'flex';
//     div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
//     container.appendChild(div);
//   });
//   console.time('列表时间结束');
// }

// 1.分页 + setTimeout 2s
// const renderListPaged = async () => {
//   console.time('列表时间开始');
//   const list = await getList();
//   const total = list.length;
//   const page = 0;
//   const limit = 200;  // 10w / 200
//   const totalPage = Math.ceil(total / limit);
//   const render = (page) => {
//     if (page >= totalPage) return;
//     setTimeout(() => {
//       for (let i = page * limit; i < page * limit + limit; i++) {
//         const item = list[i];
//         const div = document.createElement('div');
//         div.className = 'flex';
//         div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
//         container.appendChild(div);
//       }
//       render(page+1);
//     }, 0);
//   }

//   render(page);
//   console.timeEnd('列表时间结束');
// }

// 2.requestAnimationFrame减少重排
// window.requestAnimationFrame();  浏览器自带的一个函数，告诉浏览器在下次重绘之前更新页面
// const renderRequestAnimationFrame = async () => {
//   console.time('列表时间开始');
//   const list = await getList(); // 一次性获取 10w条数据
//   // 分段处理(分页处理)
//   const total = list.length;
//   const page = 0;
//   const limit = 200;
//   const totalPage = Math.ceil(total / limit);
//   const render = (page) => {
//     if (page > totalPage) {
//       return;
//     }
//     // 使用requestAnimationFrame替代setTimeout
//     requestAnimationFrame(() => {
//       for (let i = page*limit; i < page; i++) {
//         const item = list[i];
//         const div = document.createElement('div');
//         div.className = 'flex';
//         div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
//         container.appendChild(div);
//       }
//       render(page+1);
//     }, 0);
//   }

//   render(page);
//   console.timeEnd('列表时间结束');
// }

// 3.createDocumentFragment 文档碎片  --- 终极解决方案  1s
// 是dom节点，但不是主dom树的一部分
// document.createDocumentFragment()

const renderCreateDocumentFragment = async () => { 
  console.time('列表时间开始');
  const list = await getList(); // 一次性获取 10w条数据
  // 分段处理(分页处理)
  const total = list.length;
  const page = 0;
  const limit = 200;
  const totalPage = Math.ceil(total / limit);
  const render = (page) => { 
    if (page > totalPage) {
      return;
    }
    // 使用requestAnimationFrame替代setTimeout
    requestAnimationFrame(() => { 
      // 创建一个文档碎片
      const fragment = document.createDocumentFragment();
      for (let i = page*limit; i < page; i++) {
        const item = list[i];
        const div = document.createElement('div');
        div.className = 'flex';
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        fragment.appendChild(div);
      }
      // 一次性appendChild
      container.appendChild(fragment);
      render(page+1);
    }, 0);
  }

  render(page);
  console.timeEnd('列表时间结束');
}