import { ApolloError, gql, useMutation } from '@apollo/client'
import { Image, Input, PickerView, PickerViewColumn, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { produce } from 'immer'
import { useCallback, useMemo, useState } from 'react'

import { SwitchLicensePNG, SwitchUnlicensePNG } from 'src/assets/png'
import { ArrowDownSVG, CameraSVG, DeleteImageSVG, GoSVG } from 'src/assets/svg'
import { PopupProps } from 'src/components/PopupContainer'
import { authenExampleImage } from 'src/constants/images'
import { useAuth } from 'src/stores/useAuth'
import { AuthenticationInfo, Gender } from 'src/types/generated-types'
import { genRandomUserInfo } from 'src/utils/genRandomUserInfo'
import { imageMogr2 } from 'src/utils/imageMogr2'

import { useUploadAuthenImages } from '../hooks/useUploadAuthenImage'
import { useAuthPage } from '../stores/useAuthPage'

interface Inputs {
  studentId: string
  images: string[]
}

type PickerKey = 'gender' | 'grade' | 'college' | 'subCampus'
interface PickerItem {
  typename: string
  lists: string[][]
  selected: number[]
}
type Pickers = Record<PickerKey, PickerItem>

const years = (() => {
  const currentDate = new Date()
  const currentYear = currentDate.getMonth() + 1 >= 7
    ? currentDate.getFullYear()
    : currentDate.getFullYear() - 1
  const arr: number[] = []
  for (let y = 1983; y <= currentYear; y++) {
    arr.push(y)
  }
  return arr
})()

const initInputs: Inputs = {
  studentId: '',
  images: [],
}

const initPickers: Pickers = {
  gender: {
    typename: '性别',
    lists: [['男生', '女生']],
    selected: [0],
  },
  subCampus: {
    typename: '校区',
    lists: [['粤海校区', '西丽校区']],
    selected: [0],
  },
  grade: {
    typename: '年级',
    lists: [['本科生', '研究生'], years.map(y => `${y}级`)],
    selected: [0, years.length - 1],
  },
  college: {
    typename: '学院',
    lists: [
      [
        '教育学部',
        '艺术学部',
        '医学部',
        '马克思主义学院',
        '经济学院',
        '法学院',
        '心理学院',
        '体育学院',
        '人文学院',
        '外国语学院',
        '传播学院',
        '数学与统计学院',
        '物理与光电工程学院',
        '化学与环境工程学院',
        '生命与海洋科学学院',
        '机电与控制工程学院',
        '材料学院',
        '电子与信息工程学院',
        '计算机与软件学院',
        '建筑与城市规划学院',
        '土木与交通工程学院',
        '管理学院',
        '政府管理学院',
        '高等研究院',
        '金融科技学院',
        '国际交流学院',
        '继续教育学院',
      ],
    ],
    selected: [0],
  },
}

function Subtitle ({ text, className }: { text: string, className?: string }) {
  return (
    <View className={clsx(['flex flex-row', className])}>
      <View className='ml-6 box-border h-21 w-1 rounded-full border-2 border-solid border-blue-main' />
      <Text className='ml-6 text-16 font-bold text-blue-main'>
        {text}
      </Text>
    </View>
  )
}

export function Manual () {
  const { setPopup } = useAuthPage()
  const { whoAmI } = useAuth()

  const uploadAuthenImages = useUploadAuthenImages()
  const [authenUser] = useMutation(gql`
    mutation ManualAuthenUser($id: String!, $info: AuthenticationInfo) {
      user: authenUser(id: $id, info: $info) {
        id studentId college subCampus school grade gender
      }
    }
  `, {
    refetchQueries: ['WhoAmI'],
    awaitRefetchQueries: true,
  })

  const [agreed, setAgreed] = useState(false)
  const [authening, setAuthening] = useState(false)
  const [inputs, setInputs] = useState<Inputs>(initInputs)
  const [pickers, setPickers] = useState<Pickers>(initPickers)

  const info = useMemo<Omit<AuthenticationInfo, 'name' | 'avatarImageUrl'>>(() => {
    const genderIndex = pickers.gender.selected[0]
    const subCampusIndex = pickers.subCampus.selected[0]
    const collegeIndex = pickers.college.selected[0]
    return {
      gender: [Gender.Male, Gender.Female][genderIndex],
      subCampus: pickers.subCampus.lists[0][subCampusIndex],
      college: pickers.college.lists[0][collegeIndex],
      grade: [
        pickers.grade.lists[0][pickers.grade.selected[0]].substring(0, 2),
        pickers.grade.lists[1][pickers.grade.selected[1]].substring(2, 4),
      ].join(' '),
      images: inputs.images,
      school: '深圳大学',
      studentId: parseInt(inputs.studentId),
    }
  }, [inputs, pickers])

  const onOpenPicker = useCallback(
    (type: PickerKey) => {
      const { lists, typename, selected } = pickers[type]
      setPopup(() => ({ close, hide }: PopupProps) => (
        <View
          className='fixed top-0 bottom-0 left-0 right-0 flex'
          onClick={close}>
          <View
            className={clsx([
              'm-auto box-border flex w-290 flex-col items-center rounded-2xl bg-white px-20',
              'transition-all duration-300 ease-in-out',
              ['appear', hide && 'disappear'],
            ])}
            onClick={e => e.stopPropagation()}>

            <View className='my-20'>
              <Text className='text-14'>选择{typename}</Text>
            </View>

            <PickerView
              className='h-150 w-full'
              indicatorClass='h-37'
              value={selected}
              onChange={e => setPickers(produce(draft => {
                draft[type].selected = e.detail.value
              }))}>
              {lists.map((list, i) => (
                <PickerViewColumn key={i}>
                  {list.map((item, j) => (
                    <View
                      className='text-center text-16 leading-37'
                      key={j}>
                      {item}
                    </View>
                  ))}
                </PickerViewColumn>
              ))}
            </PickerView>

            <View
              className='mb-20 px-50 py-10'
              onClick={close}>
              <Text className='text-18 text-blue-main'>完成</Text>
            </View>

          </View>
        </View>
      ))
    },
    [pickers, setPopup],
  )

  const onChooseImages = useCallback(async () => {
    const res = await Taro.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
    })
    if (info.images.length + res.tempFilePaths.length <= 9) {
      setInputs(produce(draft => {
        draft.images = [...info.images, ...res.tempFilePaths]
      }))
    } else {
      await Taro.showModal({
        title: '信息错误',
        content: '图片不能超过9张',
        showCancel: false,
      })
    }
  }, [info.images])

  const onClickSubmitInfo = useCallback(async () => {
    if (Number.isNaN(info.studentId)) {
      await Taro.showModal({
        title: '信息错误',
        content: '填写10位学号',
        showCancel: false,
      })
      return
    }

    if (info.images.length === 0) {
      await Taro.showModal({
        title: '信息错误',
        content: '至少要上传一张图片',
        showCancel: false,
      })
      return
    }

    if (!agreed) {
      await Taro.showModal({
        title: '信息错误',
        content: '请同意协议',
        showCancel: false,
      })
      return
    }

    setAuthening(true)

    const images = await uploadAuthenImages(info.images)
    console.log(images)

    try {
      await authenUser({
        variables: {
          id: whoAmI?.id,
          info: {
            ...(await genRandomUserInfo()),
            ...info,
            images,
          },
        },
      })
    } catch (err) {
      if (err instanceof ApolloError) {
        console.log(err.graphQLErrors)
        await Taro.showModal({
          title: '提交失败',
          content: err.graphQLErrors[0].message,
          showCancel: false,
        })
      }
      setAuthening(false)
      return
    }

    setAuthening(false)
    await Taro.navigateTo({ url: '/pages/auth/auth?tab=submitted' })
  }, [agreed, authenUser, info, uploadAuthenImages, whoAmI?.id])

  return (
    <View className='flex flex-col bg-gray-f6'>
      <View className='h-header-h' />
      <View className='flex flex-col rounded-t-forty bg-white'>
        <Text className='mx-auto my-24 text-22 font-bold text-blue-main'>手动认证</Text>

        <View className='mx-40 mt-14 flex flex-row'>

          <View className='flex-[3]'>
            <Subtitle text='学号' />

            <Input
              className='mt-8 h-32 rounded-five px-16 text-13 leading-32 border-1 border-solid border-gray-ee'
              placeholder='请输入你的10位学号'
              placeholderClass='text-13 text-gray-70 leading-32'
              type='digit'
              maxlength={10}
              value={inputs.studentId}
              onInput={e => setInputs(produce(draft => {
                draft.studentId = e.detail.value
              }),
              )} />
          </View>

          <View className='ml-30 flex-[2]'>
            <Subtitle text='性别' />

            <View
              className='mt-8 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
              onClick={() => onOpenPicker('gender')}>
              <Text className='text-13 text-gray-70'>
                {{
                  MALE: '男生',
                  FEMALE: '女生',
                }[info.gender]}
              </Text>
              <Image
                className='h-12 w-12'
                src={ArrowDownSVG} />
            </View>
          </View>

        </View>

        <View className='mx-40 mt-14 flex flex-row'>

          <View className='flex-[1]'>
            <Subtitle text='校区' />

            <View
              className='mt-8 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
              onClick={() => onOpenPicker('subCampus')}>
              <Text className='text-13 text-gray-70'>
                {info.subCampus}
              </Text>
              <Image
                className='h-12 w-12'
                src={ArrowDownSVG} />
            </View>
          </View>

          <View className='ml-30 flex-[1]'>
            <Subtitle text='学院' />

            <View
              className='mt-8 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
              onClick={() => onOpenPicker('college')}>
              <Text className='whitespace-nowrap text-13 text-gray-70'>
                {info.college}
              </Text>
              <Image
                className='h-12 w-12'
                src={ArrowDownSVG} />
            </View>
          </View>

        </View>

        <View className='mx-40 mt-14'>
          <Subtitle text='年级' />

          <View
            className='mt-8 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
            onClick={() => onOpenPicker('grade')}>
            <Text className='text-13 text-gray-70'>{info.grade}</Text>
            <Image
              className='h-12 w-12'
              src={ArrowDownSVG} />
          </View>
        </View>

        <View className='mx-40 mt-14'>
          <Subtitle text='有效信息上传' />

          <View className='mt-10 flex flex-row justify-between'>

            <View className='flex w-137 flex-col'>

              <View className='relative flex h-77 items-center rounded-md bg-gray-f6'>
                <Image
                  className='h-77 w-137'
                  onClick={() => Taro.previewImage({
                    current: authenExampleImage,
                    urls: [authenExampleImage],
                  })}
                  src={imageMogr2({
                    src: authenExampleImage,
                    format: 'webp',
                    thumbnail: '274x154',
                  })} />
                {/* <Image
                  className='absolute left-2 z-50 h-22 w-12'
                  src={BackwardSVG} />
                <Image
                  className='absolute right-2 z-50 h-22 w-12'
                  src={ForwardSVG} /> */}
              </View>

              <Text className='mx-auto text-12 text-gray-9c'>示例</Text>

            </View>

            <View className='flex w-137 flex-col'>

              <View
                className='flex h-77 rounded-md bg-gray-f6'
                onClick={onChooseImages}>
                <Image
                  className='m-auto h-32 w-32'
                  src={CameraSVG} />
              </View>

              <Text className='mx-auto text-12 text-gray-9c'>上传有效信息证明</Text>

            </View>

          </View>

        </View>

        {info.images.length > 0 && (
          <ScrollView className='mt-14 whitespace-nowrap' scrollX>

            <View className='inline-block w-40' />

            {info.images.map((item, index) => (
              <View
                className={clsx([
                  'relative inline-block overflow-hidden',
                  index !== 0 && 'ml-8',
                ])}
                key={index}>

                <Image
                  className='h-85 w-85 rounded-md'
                  src={item}
                  onClick={() => Taro.previewImage({ current: item, urls: info.images })}
                  mode='aspectFill' />

                <Image
                  className='absolute right-0 h-16 w-16'
                  src={DeleteImageSVG}
                  onClick={() => setInputs(produce(draft => {
                    draft.images = info.images.filter((_p, i) => i !== index)
                  }))} />

              </View>
            ))}

            <View className='inline-block w-40' />

          </ScrollView>
        )}

        <View className='mx-40 mt-24 flex flex-row justify-between'>

          <Image
            className='relative top-3 h-17 w-17'
            onClick={() => setAgreed(!agreed)}
            src={agreed ? SwitchLicensePNG : SwitchUnlicensePNG} />

          <View className='ml-6 flex-1'>
            <Text className='text-13 text-gray-400'>我已阅读并同意</Text>
            <Text
              className='text-13 text-blue-main'
              onClick={() => Taro.navigateTo({ url: '/pages/agreement/agreement' })}>《白板使用协议》</Text>
            <Text className='text-13 text-gray-400'>并授权产品登陆校园网</Text>
          </View>

        </View>

        {authening
          ? <Text className='mx-auto mt-24 text-15 text-gray-400'>
            {'小白板正在认证中，不要走开噢><'}
          </Text>
          : <Image
              src={GoSVG}
              className='mx-auto mt-24 h-66 w-66'
              onClick={onClickSubmitInfo} />}

        <View className='h-24' />

        <View className='h-safe-b' />

      </View>
    </View>
  )
}
