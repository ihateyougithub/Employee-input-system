var express = require('express')

var bodyParser= require('body-parser')

var multer = require('multer')

var fs = require('fs')

var web = express();

var form = multer();

web.use(express.static('public'))

web.use(bodyParser.urlencoded({extended:false}))

web.post('/add',form.array(),function(req ,res){

    
    fs.exists('data',function(isExist){

        if(!isExist)
        {
            fs.mkdirSync('data');
        }
        
        var data = req.body;

        var obj = {
            data ,

            des:'入职员工信息'
        }

        obj = JSON.stringify(obj);

        fs.appendFile('data/info.txt',obj + ',\n',function(err){
            if(err)
            {
                res.send('文件写入失败' + err)
            }
            else 
            {
                res.send('文件写入成功');
            }
        })
    })
})

web.get('/getAll',function(req ,res)
{
    // 首先判断有没有文件夹
    // 有的话读
    fs.exists('data',function(isExists){

        if(isExists)
        {
            fs.readFile('data/info.txt',function(err, data){

                if(err)
                {
                    res.send('读取失败')
                }
                else 
                {
                    res.send(data)
                }
            })
        }
        else   //没有的则不读
        {
            res.send('暂无数据')
        }
    })
    
})
// //1.获取输入框的值
//     然后使用xhr的form方式（form.appen()）
//     将数据发送到后台 （发送之前将数据转化成字符串 JSON.stringify()）
// //2.服务器接收值
//     判断本地有没有指定的文件夹
//     没有则 同步创建
//     有的话 直接写入
//     因为数据从前端传过来的时候已经是字符换
//     使用fs.appendFile()方式进行写入
// //3.前端显示所有数据
//     使用xhr的get方式 发送请求到后台
// //4.后台接收到请求
//     判断本地有没有指定的文件夹
//     如果有 说明里面有文件
//     如果没有 则不返回
//     有数据的话 首先读取数据 fs.readFile()
//     该方式有两个参数 1路径 2回调函数
//     回调函数有2个参数 1.错误信息 2.读取的数据
//     读取到数据以后 将数据发送到前端
// //5.前端接收到服务器发回的所有信息
//     将信息进行截取（去掉了,）
//     将信息添加 到数组中 ('[' + ']')
//     将信息转化成对象
//     遍历对象 取出对应的数据
//     在之前的结果上 追加新的数据 （+=）
web.listen('8080',function()
{
    console.log('启动成功')
})