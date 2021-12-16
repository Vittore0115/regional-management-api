// 构建省市区列表树
function getTree (arr) {
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i]
		item.children = arr.filter(temp => temp.p_code == item.code)
		if(item.level != 3) item.hasChildren = true
		if (item.children.length > 0) {
			getTree(item.children)
		}
	}
	return arr.filter(item => {
		return item.p_code == 0
	})
}

// 获取位置信息
function getLocation (results) {
	return new Promise((resolve) => {
		resolve(getTree(results))
	})

}

module.exports = getLocation