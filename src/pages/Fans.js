import React, { useEffect, useState } from 'react'
import { Table, Tabs, Button, DatePicker } from 'antd'
import { get } from '../util/request'
import { wechat as wechatApi, fans, fansxlsx } from '../util/api'
import dayjs from 'dayjs'
import filedownload from 'js-file-download'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const columns = [
    {
        title: '日期',
        dataIndex: '日期',
        key: '日期',
    },
    {
        title: '新关注人数',
        dataIndex: '新关注人数',
        key: '新关注人数',
    },
    {
        title: '搜索公众号名称',
        dataIndex: '公众号搜索',
        key: '公众号搜索',
    },
    {
        title: '扫描二维码',
        dataIndex: '扫描二维码',
        key: '扫描二维码',
    },
    {
        title: '图文页右上角菜单',
        dataIndex: '图文页右上角菜单',
        key: '图文页右上角菜单',
    },
    {
        title: '名片分享',
        dataIndex: '名片分享',
        key: '名片分享',
    },
    {
        title: '其他来源',
        dataIndex: '其他合计',
        key: '其他合计',
    },
    {
        title: '取消关注人数',
        dataIndex: '取消关注人数',
        key: '取消关注人数',
    },
    {
        title: '净增关注人数',
        dataIndex: '净增关注人数',
        key: '净增关注人数',
    },
    {
        title: '累计关注人数',
        dataIndex: '累计关注人数',
        key: '累计关注人数',
    },
]

const FansTable = props => {
    const { wechat, date } = props
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(0)
    const [pagination, setPagination] = useState({
        hideOnSinglePage: true,
        pageSize: 20,
        current: 1
    })

    const syncFansList = () => {
        setLoading(1)
        get(`${fans}/${wechat.id}`, {
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current - 1,
                ...date
            }
        }).then(data => {
            setLoading(0)
            if (data) {
                const { rows, rowsCount } = data
                setDataList(rows || [])
                setPagination({ ...pagination, total: rowsCount })
            }
        })
    }

    useEffect(syncFansList, [wechat.id, pagination.pageSize, pagination.current, date])

    const tableChangeHandler = (page) => {
        setPagination({ ...pagination, current: page.current })
    }

    return (
        <Table size="small"
            rowKey="日期"
            pagination={pagination}
            columns={columns}
            dataSource={dataList}
            loading={loading}
            onChange={tableChangeHandler}
        />
    )
}

export default props => {
    const [wechatList, setWechatList] = useState([])
    const [activeWechatId, setActiveWechatId] = useState(0)
    const [date, setDate] = useState({
        begin_date: dayjs().add(-7, 'd').format('YYYY-MM-DD'),
        end_date: dayjs().add(-1, 'd').format('YYYY-MM-DD')
    })

    const syncWechatList = () => {
        get(wechatApi).then(data => {
            setWechatList(data || [])
            setActiveWechatId(data && data[0] && data[0].id)
        })
    }

    useEffect(syncWechatList, [])

    const dateChangeHandler = (dates, dateStrings) => {
        const [begin_date, end_date] = dateStrings
        setDate({ begin_date, end_date })
    }

    const downloadHandler = () => {
        get(`${fansxlsx}/${activeWechatId}`, { params: date, responseType: 'arraybuffer' }).then(res => {
            if (res) {
                let blob = new Blob([res.data], { type: res.headers['content-type'] })
                filedownload(blob, `export_fans_${date.begin_date}_${date.end_date}.xlsx`)
            }
        })
    }

    return (
        <div style={{ padding: '0 30px' }}>
            <Tabs defaultActiveKey={`${activeWechatId}`}
                size="small"
                onChange={key => { setActiveWechatId(key) }}
                tabBarExtraContent={<>
                    <RangePicker bordered={false} onChange={dateChangeHandler}
                        defaultValue={[dayjs().add(-7, 'd'), dayjs().add(-1, 'd')]}
                        ranges={{
                            Yesterday: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')],
                            'Last Week': [dayjs().add(-1, 'w').startOf('week'), dayjs().add(-1, 'w').endOf('week')],
                            'This Week': [dayjs().startOf('week'), dayjs().endOf('week')],
                            'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
                        }} />
                    <Button type="link" onClick={downloadHandler}>Download xlsx</Button>
                </>}>
                {
                    wechatList.map(c => (
                        <TabPane tab={c.name} key={c.id}>
                            <FansTable date={date} wechat={c} />
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
}