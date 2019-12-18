<script>

let httpBaseDomain = process.env.NODE_ENV === 'development' ? 'http://10.200.11.173:8099/gxdkmzjzl' : 'http://kmzl.cindata.cn/gxdkmzjzl'


const httpPicBaseDomain = "http://111.40.214.171"

const cityId = 5301

export default {
    httpBaseDomain,//服务器域名
    httpPicBaseDomain,//图片服务器域名
    cityId //城市id
}
</script>>