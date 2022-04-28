export const launchPreloaderList = [
  require('@/assets/img/cover_bg.jpg'),
  require('@/assets/img/cover_logo.png'),
  require('@/assets/img/cover_subject.png'),
  require('@/assets/img/cover_slogan.png'),
  require('@/assets/img/cover_btn_start.png'),
  require('@/assets/img/guide_bg.jpg'),
  require('@/assets/img/guide_sign.png'),
  require('@/assets/img/guide_upload.png'),
  require('@/assets/img/guide_box.png'),
  require('@/assets/img/guide_vote.png')
]

export const delayPreloaderList = [
  require('@/assets/img/apply_box.png'),
  require('@/assets/img/apply_input_bg.png'),
  require('@/assets/img/apply_input_channel.png'),
  require('@/assets/img/apply_input_city.png'),
  require('@/assets/img/apply_input_mobile.png'),
  require('@/assets/img/apply_input_name.png'),
  require('@/assets/img/apply_input_number.png'),
  require('@/assets/img/apply_next.png')
]

const imgPreloader = url => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve()
    }
    image.onerror = (error) => {
      reject(error)
    }
    image.src = url
  })
}

export const imgsPreloader = imgs => {
  const promiseArr = []
  imgs.forEach(element => {
    promiseArr.push(imgPreloader(element))
  })
  return Promise.all(promiseArr)
}
