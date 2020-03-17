import React, { useEffect, useState } from 'react'
import { Table, Tabs, Button, DatePicker } from 'antd'
import { get } from '../util/request'
import { wechat as wechatApi } from '../util/api'
import dayjs from 'dayjs'
import filedownload from 'js-file-download'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const DataTable = props => {
    const { wechat, date, columns, dataapi } = props
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(0)
    const [pagination, setPagination] = useState({
        hideOnSinglePage: true,
        pageSize: 20,
        current: 1
    })

    const syncFansList = () => {
        setLoading(1)
        get(`${dataapi}/${wechat.id}`, {
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
            style={{ fontSize: 12 }}
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
    const { dataapi, xlsxapi, columns, sta } = props

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
        get(`${xlsxapi}/${activeWechatId}`, { params: date, responseType: 'arraybuffer' }).then(res => {
            if (res) {
                let blob = new Blob([res.data], { type: res.headers['content-type'] })
                filedownload(blob, `export_${sta}_${date.begin_date}_${date.end_date}.xlsx`)
            }
        })
    }

    return (
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
                        <DataTable dataapi={dataapi} columns={columns} date={date} wechat={c} />
                    </TabPane>
                ))
            }
        </Tabs>
    )
}