
import { articlel7 } from './api'
import { get } from './request'

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
        switch (key) {
            case 'WxWechatData':
                const { commonData: { data: { t, lang, user_name } } } = data
                ReqWechatArticle(t, lang, user_name)
                break;
            case 'WxWechatArticleDetail':
                console.log('WxWechatArticleDetail', data)
                // 保存data到数据库
                break;
        }
    }

}, false);

// 从数据库读取最近7天的发文，轮训获取数据
const ReqWechatArticle = async (token, lang, wechatname) => {
    if (!wechatname || !token) return

    const articleList = await get(`${articlel7}/${wechatname}`)
    console.log(articleList);

    const ifr = document.getElementById('ifr_hid')
    articleList.forEach(article => {
        article.ref_date='2019-10-28'
        console.log(`https://mp.weixin.qq.com/misc/appmsganalysis?action=detailpage&msgid=${article.msgid}&publish_date=${article.ref_date}&type=int&token=${token}&lang=${lang}`);
        
        // ifr.data = `https://mp.weixin.qq.com/misc/appmsganalysis?action=detailpage&msgid=${article.msgid}&publish_date=${article.ref_date}&type=int&token=${token}&lang=${lang}`
    });
}

export default ReqWechatArticle