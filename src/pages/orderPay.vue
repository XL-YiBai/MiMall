<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up': showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                  <li><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2c9307e9690dfbca39d8de770a7a8664.png" alt="">小米8 青春 全网通版 6GB内存 深空灰 64GB</li>
                  <li><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2c9307e9690dfbca39d8de770a7a8664.png" alt="">小米8青春版 标准高透贴膜 高透</li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked': payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked': payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="是，查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>请确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import ScanPayCode from '../components/ScanPayCode.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'order-pay',
  components: { ScanPayCode, Modal },
  data() {
    return {
      orderId: this.$route.query.orderNo, // 订单号
      addressInfo: '', // 收货人 地址信息
      orderDetail: [], // 订单详情，包含了商品列表
      showDetail: false, // 是否显示订单详情
      payType: '', // 支付类型
      showPay: false, // 是否显示微信支付弹框
      payImg: '', // 微信支付的二维码地址
      showPayModal: false, // 显示是否支付确认的二次弹框
      payment: 0, // 订单总金额
      T: '', // 轮询定时器setInterval的ID
    }
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        let item = res.shippingVo; // 收获人和地址信息
        // 拼接收货人和地址信息
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        this.orderDetail = res.orderItemVoList; // 订单详情，每个购买的商品列表
        this.payment = res.payment;
      })  
    },
    paySubmit(payType) {
      if (payType == 1) {
        // 第一个参数为url，第二个参数_blank指定新窗口打开
        window.open('/#/order/alipay?orderId=' + this.orderId, '_blank');
      } else {
        this.axios.post('/pay', {
          orderId: this.orderId,
          orderName: '忆白商城',
          amount: 0.01, // 金额默认0.01元
          payType:2 // 1支付宝，2微信
        }).then((res) => {
          // 通过QRCode插件把接收到的微信支付地址参数转换为base64的图片
          QRCode.toDataURL(res.content).then(url => {
            this.showPay = true; // 弹出微信支付框
            this.payImg = url; // 保存转换的图片到payImg
            this.loopOrderState(); // 开启轮询，间隔一定时间查看用户是否完成支付
          }).catch(() => {
            this.$message.error('微信二维码生成失败，请稍后重试')
          })
        })
      }
    },
    // 关闭微信支付弹框
    closePayModal() {
      this.showPay = false; // 关闭微信二维码支付弹框
      this.showPayModal = true; // 显示是否已经支付的弹框
      clearInterval(this.T); 
    },
    // 定时循环查询订单是否支付，如果查询已经支付，就直接跳转订单列表页面
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status == 20) {
            clearInterval(this.T); 
            this.goOrderList(); // 跳转订单列表页面
          }
        })
      }, 1000)
    },
    goOrderList() {
      this.$router.push('/order/list');
    }
  },
}
</script>

<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            // .icon-up{
            //   transform: rotate(180deg);
            // }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>