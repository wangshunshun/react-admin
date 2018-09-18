import MUtil from '../util/mm.js';
const _mm=new MUtil();

class Order{
    // 获取订单列表
    getOrderList(listParam){
        return _mm.request({
            url: '/manage/order/list.do',
            type: 'get',
            data: listParam
        });
    }
    // 获取订单详情
    getOrderDetail(listParam){
        return _mm.request({
            url: '/manage/order/detail.do',
            type: 'get',
            data: listParam
        });
    }
    getSearchList(listParam){
        return _mm.request({
            url: '/manage/order/search.do',
            type: 'post',
            data: listParam
        });
    }
}

export default Order;