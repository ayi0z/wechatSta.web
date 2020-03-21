
import { articlel7, articleexttotal, articleextdetail } from './api'
import { get, post } from './request'

/* https://mp.weixin.qq.com/misc/appmsganalysis?
 * action=detailpage
 * &msgid=2247484164_1
 * &publish_date=2019-10-28
 * &type=int
 * &token=1045928776
 * &lang=zh_CN
*/
window.addEventListener('message', function (event) {
    const { data: { key, data }, origin } = event
    if (key && origin === "https://mp.weixin.qq.com") {
        const handler = ReqWechatArticleHandler[key]
        if (handler) handler(data)
    }

}, false);

window.ReqArticleList = null

const ReqArticleData = () => {
    if (!window.ReqArticleList || !window.ReqArticleList.length) return
    const { token, lang } = window.ReqArticleToenLang || {}
    if (!token || !lang) return
    const ifr = document.getElementById('ifr_hid')
    if (ifr) {
        const article = window.ReqArticleList.shift()
        if (article) {
            ifr.data = `https://mp.weixin.qq.com/misc/appmsganalysis?action=detailpage&msgid=${article.msgid}&publish_date=${article.ref_date}&type=int&token=${token}&lang=${lang}`
        }
    }
}

const ReqWechatArticleHandler = {
    // 从数据库读取最近7天的发文，轮训获取数据
    WxWechatData: async (data) => {
        const { commonData: { data: { t, lang, user_name } }, cgiData } = data
        const token = t, wechatname = user_name
        if (!wechatname || !cgiData) return

        const { mass_data } = cgiData || {}
        const { sent_list } = mass_data || {}
        if (!sent_list) return

        const appmsginfolist = sent_list.map(s => s.appmsg_info).flat()
            .map(m => { m.msgid = `${m.appmsgid}_${m.itemidx}`; return m; })
        appmsginfolist.forEach(c => {
            if (c.msgid && c.like_num * 1 && c.read_num * 1) {
                post(`${articleexttotal}/${wechatname}`, {
                    msgid: c.msgid,
                    itemidx: c.itemidx,
                    like_num: c.like_num,
                    read_num: c.read_num
                })
            }
        })

        if (!token) return
        window.ReqArticleList = await get(`${articlel7}/${wechatname}`)
        window.ReqArticleToenLang = { token, lang }
        ReqArticleData()
    },
    WxWechatArticleDetail: data => {
        const { commonData: { data: { user_name } }, cgiData } = data
        if (!user_name || !cgiData) return
        const wechatname = user_name

        const { articleData } = cgiData || {}
        const { msgid, target_user, jump_list, total_share_count } = articleData || {}
        if (!msgid || !jump_list) return
        let finish_reader_num = jump_list.filter(jl => (jl.attr_type === 0 && jl.attr_value === 20))[0]
        let reader_num = jump_list.filter(jl => (jl.attr_type === 1 && jl.attr_value === 0))[0]
        finish_reader_num = (finish_reader_num && finish_reader_num.user_count) || 0
        reader_num = (reader_num && reader_num.user_count) || 0
        const share_num = total_share_count || 0
        post(`${articleextdetail}/${wechatname}`, {
            msgid,
            reader_num,
            finish_reader_num,
            share_num,
            target_user: target_user || 0
        })

        ReqArticleData()
    }
}