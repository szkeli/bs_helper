import { ScrollView, Text, View } from '@tarojs/components'

import { BackHeader } from 'src/components/BackHeader'
import { wrapPage } from 'src/components/wrapPage'
import { paddings } from 'src/constants/paddings'

definePageConfig({
  disableScroll: true,
  navigationStyle: 'custom',
})

export default wrapPage(paddings, AgreementPage)

function AgreementPage () {
  return (
    <>
      <BackHeader title='白板使用协议' />
      <ScrollView
        className='h-screen w-screen bg-gray-f6'
        scrollY
        scrollTop={0}>

        <View className='px-28 pt-header-h pb-safe-b'>

          <View className='mt-24 mb-27 w-full text-center'>
            <Text className='text-16 font-bold '>白板使用协议</Text>
          </View>

          <Text className='text-14 text-gray-800'>版本更新时间：2022年2月3日</Text>

          <View className='mt-36 mb-26 w-full text-center'>
            <Text className='text-14 font-bold '>目录</Text>
          </View>

          <Text className='block text-14 font-bold leading-28'>本使用协议将帮助您了解以下内容：{' '}</Text>

          {[
            '一、社区用户行为规范',
            '二、免责公告',
            '三、平台处理声明',
            '四、校园账号隐私声明',
            '五、校园合作声明',
          ].map((str, index) => (
            <Text className='block text-14 leading-28' key={index}>
              {str}
            </Text>
          ))}

          <View className='mt-36 mb-26'>
            <Text className='text-14 font-bold'>一、社区用户行为规范</Text>
          </View>

          <Text className='block text-14 font-bold leading-28'>以下内容严禁发布：</Text>

          <View>
            <Text className='block text-14 font-bold leading-28'>1 违反国家法定法规的内容</Text>

            {[
              '1.1 反对宪法所确定的基本原则',
              '1.2 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一',
              '1.3 煽动民族仇恨、民族歧视，破坏民族团结',
              '1.4 侮辱、滥用英烈形象，否定英烈事迹，美化粉饰侵略战争行为的',
              '1.5 破坏国家宗教政策，宣扬邪教和封建迷信',
              '1.6布谣言，扰乱社会秩序，破坏社会稳定',
              '1.7 宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪',
              '1.8 煽动非法集会、结社、游行、示威、聚众扰乱社会秩序',
              '1.9 诽谤他人，泄露他人隐私，侵害他人合法权益',
              '1.10 捏造、攻击、嘲讽、戏谑、传播历任及现任党和国家领导人相关敏感信息',
              '1.11 出售、传播翻墙相关信息',
              '1.12 发布含有法律、行政法规禁止的其他内容的信息',
              '1.13 发布上级监管部门禁止的危害平台安全的信息',
            ].map((str, index) => (
              <Text className='block text-14 leading-28' key={index}>
                {str}
              </Text>
            ))}
          </View>

          <View className='mt-26'>
            <Text className='block text-14 font-bold leading-28'>2 违反校规</Text>

            {[
              '2.1 发布出租或求租床位等违法寻租信息',
              '2.2 盗用学校或学校部门、校内组织名义从事活动',
              '2.3 发布征集或提供代考、代跑、代课、代写作业等作弊信息',
              '2.4 违反深圳大学校规的任何内容',
            ].map((str, index) => (
              <Text className='block text-14 leading-28' key={index}>
                {str}
              </Text>
            ))}
          </View>

          <View className='mt-26'>
            <Text className='block text-14 font-bold leading-28'>3 违反以下社区规定</Text>

            {[
              '3.1 进行人肉搜索、恶意挂名、网络暴力与人身攻击的',
              '3.2 煽动一切形式的歧视行为的',
              '3.3 发布烟草、电子烟、招嫖信息、原味衣物以及其它违反法规的闲置信息',
              '3.4 擅自散布商业广告以及类似',
            ].map((str, index) => (
              <Text className='block text-14 leading-28' key={index}>
                {str}
              </Text>
            ))}
          </View>

          <View className='mt-36'>
            <Text className='mb-26 block text-14 font-bold'>二、免责公告</Text>
            <Text className='text-14'>用户在产品内的一切行为导致的直接或间接造成的利润、商业信誉、资料损失或其他有形或无形损失，平台不承担任何直接、间接、附带、特别、衍生性或惩罚性的赔偿责任。(即使平台事先已被告知发生此种赔偿之可能性亦然)</Text>
          </View>

          <View className='mt-36'>
            <Text className='mb-26 block text-14 font-bold'>三、平台处理声明</Text>
            <Text className='text-14'>平台有监督言论的责任，一切事实上或疑似违反规定的内容，平台将视情况采取拒绝发布、删除内容等一切管制措施。涉嫌任何违法违规违纪的内容将被保存在案，并在接受政府部门或校方调查时如实报告。</Text>
          </View>

          <View className='mt-36'>
            <Text className='mb-26 block text-14 font-bold'>四、校园账号隐私声明</Text>
            <Text className='text-14'>白板不代表大学官方向您收集信息，您的校园账号将仅用于社区认证与校园工具必要的信息获取。我们深知隐私对您的重要性，产品不会在数据库存储任何用户的校园密码以杜绝泄漏的可能性。此外，白板项目代码是完全开源的，其隐私保护接受一切形式的监督。</Text>
          </View>

          <View className='my-36'>
            <Text className='mb-26 block text-14 font-bold'>五、校园合作声明</Text>
            <Text className='text-14'>白板团队欢迎校方合作监管、共建良性平台，白板产品的后台可为校方开放。我们也将持续尝试与相关部门联系。</Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
