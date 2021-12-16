const express = require("express");
const handleDB = require("../db/handleDB");
const url = require('url')

const app = express();

// 查询
app.get("/getAreaList", (req, res) => {
	let results = []
	let params = url.parse(req.url, true).query;
	(async function index () {	
		// 判断是否有分页查询参数
		if(Boolean(params.pageIndex) && Boolean(params.limit)){
			// 分页查询
			results = await handleDB(res, "province_city_county_code", "limit", "province_city_county_code数据库查询数据出错！",
				{
					number: params.pageIndex,
					count: params.limit
				}
			);
		}else if(Boolean(params.areaId)){
			// 条件查询
			results = await handleDB(res, "province_city_county_code", "limit", "province_city_county_code数据库查询数据出错！",
				{
					where : params.areaId
				}
			);
		}else if(params.isList){
			// 全量查询
			results = await handleDB(res, "province_city_county_code", "limit", "province_city_county_code数据库查询数据出错！",
				{
					isList : params.isList
				}
			)
		}else{
			//常规查询
			results = await handleDB(res, "province_city_county_code", "find", "province_city_county_code数据库查询数据出错！")
		}
		//查询到的结果返回前端
		res.send(results);
	})();
})

// 新增
app.get("/getAreaList/save", (req, res) => {
	let params = url.parse(req.url, true).query;
	(async function index () {

		let results = await handleDB(res, "province_city_county_code", "insert", "数据库操作失败", {
			status: params.status,
			name: params.name,
			p_code: params.code
		});
		
		res.send(results);
	})();
})

// 修改
app.get("/getAreaList/update", (req, res) => {
	let params = url.parse(req.url, true).query;
	(async function index () {
 
	let results = await handleDB(res, "province_city_county_code", "update", "数据库操作失败",`id=${params.id}`, {name: params.locationName,status:params.status});
	
	res.send(results);
	
})();
})

// 删除
app.get("/getAreaList/delete", (req, res) => {
	let params = url.parse(req.url, true).query;
	(async function index () {
		
	let results = await handleDB(res, "province_city_county_code", "delete", "数据库操作失败", `code=${params.code} and p_code=${params.p_code}`);

	res.send(results);
	})();
})



module.exports = app