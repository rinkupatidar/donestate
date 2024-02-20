export const GREY_DARKEST = '#1f1f1f'
export const GREY_DARKER = '#363636'
export const GREY_DARK = '#4a4a4a'
export const GREY = '#7a7a7a'
export const GREY_LIGHT = '#b5b5b5'
export const GREY_LIGHTER = '#dbdbdb'
export const GREY_LIGHTEST = '#ededed'

export const GREEN_LIGHTER = '#b3ffcd'
export const GREEN_LIGHT = '#58fe92'
export const GREEN = '#01f958'
export const GREEN_DARK = '#018e32'
export const GREEN_DARKER = '#00561e'

export const BLUE_LIGHTER = '#bfe3fd'
export const BLUE_LIGHT = '#5cb8fa'
export const BLUE = '#0d96f8'
export const BLUE_DARK = '#0670bc'
export const BLUE_DARKER = '#04538b'

export const YELLOW_LIGHTER = '#fee1b9'
export const YELLOW_LIGHT = '#fcb859'
export const YELLOW = '#fc9f1d'
export const YELLOW_DARK = '#b56b03'
export const YELLOW_DARKER = '#693e02'

export const RED_LIGHTER = '#fcbfc6'
export const RED_LIGHT = '#f96c7d'
export const RED = '#f63148'
export const RED_DARK = '#bf081d'
export const RED_DARKER = '#890615'

export const PINK_LIGHTER = '#fecde8'
export const PINK_LIGHT = '#fd81c5'
export const PINK = '#fc45aa'
export const PINK_DARK = '#d80378'
export const PINK_DARKER = '#740240'

export const X_AXIS_STYLING: Highcharts.XAxisOptions = {
  gridLineWidth: 1,
  gridLineColor: GREY_DARKEST,
}

export const Y_AXIS_STYLING: Highcharts.YAxisOptions = {
  gridLineWidth: 1,
  gridLineColor: GREY_DARKEST,
}

export const RANGE_SELECTOR_STYLING: Highcharts.RangeSelectorOptions = {
  buttonTheme: {
    fill: GREY_DARKER,
    stroke: 'none',
    'stroke-width': 0,
    style: {
      color: 'white',
      fontWeight: 'bold',
    },
    states: {
      hover: {
        fill: YELLOW_LIGHT,
        style: {
          color: 'black',
        },
      },
      select: {
        fill: YELLOW,
        style: {
          color: 'black',
        },
      },
    },
  },
  inputBoxBorderColor: 'transparent',
  inputBoxWidth: 120,
  inputBoxHeight: 18,
  inputStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  labelStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
}

export const scrollBarStyling: Highcharts.ScrollbarOptions = {
  height: 8,
  barBorderRadius: 10,
  barBackgroundColor: GREY,
  barBorderColor: GREY_DARK,
  trackBackgroundColor: 'transparent',
  trackBorderColor: GREY_DARK,
  buttonBackgroundColor: GREY_DARK,
  buttonBorderColor: 'transparent',
}
export function getColorFromIdx(
  idx: number,
  shade: 'normal' | 'light' | 'lighter' | 'dark' | 'darker'
) {
  const obj = {
    normal: [GREEN, PINK, BLUE, YELLOW, RED],
    light: [GREEN_LIGHT, PINK_LIGHT, BLUE_LIGHT, YELLOW_LIGHT, RED_LIGHT],
    lighter: [
      GREEN_LIGHTER,
      PINK_LIGHTER,
      BLUE_LIGHTER,
      YELLOW_LIGHTER,
      RED_LIGHTER,
    ],
    dark: [GREEN_DARK, PINK_DARK, BLUE_DARK, YELLOW_DARK, RED_DARK],
    darker: [GREEN_DARKER, PINK_DARKER, BLUE_DARKER, YELLOW_DARKER, RED_DARKER],
  }
  return obj[shade][idx % 5]
}

export function hexWithTransparency(color: string, alpha: number) {
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    let hexTransparent = color.slice(0, 7)
    let alphaHex = Math.round(alpha * 255).toString(16)
    if (alphaHex.length === 1) {
      alphaHex = '0' + alphaHex
    }
    return hexTransparent + alphaHex
  } else throw new Error('Invalid hex color code')
}
export const generalToolTipStyling: Highcharts.TooltipOptions = {
  pointFormat: '{series.name}: <b>{point.y:.f}</b>',
  valueDecimals: 2,
  split: true,
}

export const getYAxisRows = (n: number) => {
  if (n > 2) {
    return [
      {
        height: '50%',
        ...Y_AXIS_STYLING,
      },
      {
        top: '55%',
        height: '20%',
        ...Y_AXIS_STYLING,
      },
      {
        top: '80%',
        height: '20%',
        ...Y_AXIS_STYLING,
      },
    ]
  } else
    return [
      {
        height: '65%',
        ...Y_AXIS_STYLING,
      },
      {
        top: '70%',
        height: '30%',
        ...Y_AXIS_STYLING,
      },
    ]
}
