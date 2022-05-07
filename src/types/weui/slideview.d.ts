declare namespace JSX {
  interface IntrinsicElements {
    'mp-slideview': SlideViewProps
  }
}

interface SlideViewProps {
  children: React.ReactNode

  /** 添加在组件内部结构的class，可用于修改组件内部的样式 */
  extClass?: string

  /** 是否禁用 slideview，默认值为 false */
  disable?: boolean

  /** 左滑的按钮组，建议最多3个按钮 */
  buttons: SlideViewProps.Button[]

  /** 按钮是否是icon
   * @default false
   */
  icon?: boolean

  /** 是否显示slideview，可以控制隐藏显示 */
  show?: boolean

  /** slideview显示隐藏的动画的时长
   * @default 350
   */
  duration?: number

  /** 手指移动距离超过该值的时候，触发slideview的显示隐藏
   * @default 40
   */
  throttle?: number

  /** buttons 按钮组点击时触发的事件，detail 为 { index, data }， data 是按钮的配置项传入的 data 参数 */
  onButtontap?: SlideViewProps.onButtontap

  /** 隐藏时触发的事件 */
  onHide?: import('@tarojs/components').CommonEventFunction

  /** 显示时触发的事件 */
  onShow?: import('@tarojs/components').CommonEventFunction
}

declare namespace SlideViewProps {
  type onButtontap = import('@tarojs/components').BaseEventOrigFunction<SlideViewProps.onButtontapDetail>

  interface onButtontapDetail {
    index: number
    data: any
  }

  interface Button {
    /** 按钮的额外的class，可用于修改组件内部的样式 */
    extClass?: string

    /** 按钮的类型，取值default和warn，warn是红色按钮
     * @default "default"
     */
    type?: string

    /** 按钮的文本 */
    text?: string

    /** 如果icon为true，此属性有效 */
    src?: string

    /** 触发 onButtontap 回传的数据 */
    data?: any
  }
}
