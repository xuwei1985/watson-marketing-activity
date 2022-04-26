export const launchPreloaderList = [
  require('@/assets/img/cover_bg.jpg'),
  require('@/assets/img/cover_logo.png'),
  require('@/assets/img/cover_subject.png'),
  require('@/assets/img/cover_slogan.png'),
  require('@/assets/img/cover_btn_start.png')
]

export const delayPreloaderList = [
  require('@/assets/img/apply_bg.jpg'),
  require('@/assets/img/apply_sign.png'),
  require('@/assets/img/apply_upload.png'),
  require('@/assets/img/apply_box.png'),
  require('@/assets/img/apply_vote.png')
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
