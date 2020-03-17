import React from 'react'
import { article, articlexlsx } from '../util/api'
import WechatSta from '../components/WechatSta'

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width:380
    },
    {
        title: '发布日期',
        dataIndex: 'ref_date',
        key: 'ref_date',
    },
    {
        title: '图文位置',
        dataIndex: 'msgindex',
        key: 'msgindex',
    },
    {
        title: '阅读量',
        dataIndex: 'int_page_read_count',
        key: 'int_page_read_count',
    },
    {
        title: '分享次数',
        dataIndex: 'share_count',
        key: 'share_count',
    },
    {
        title: '留言数',
        dataIndex: 'comment_count',
        key: 'comment_count',
    },
    {
        title: '好看数',
        dataIndex: 'like_count',
        key: 'like_count',
    },
    {
        title: '收藏数',
        dataIndex: 'add_to_fav_count',
        key: 'add_to_fav_count',
    },
    {
        title: '全文阅读完成率',
        dataIndex: 'target_user',
        key: 'target_user',
    },
]

export default props => {
    return (
        <div style={{ padding: '0 30px' }}>
            <WechatSta columns={columns} dataapi={article} xlsxapi={articlexlsx} />
        </div>
    )
}