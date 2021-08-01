const toHexNumber = (str => {
  return Number( `0x${str.slice( 1 )}` )
})


export const COLOR_PRIMARY = toHexNumber( "#efefef" );
export const COLOR_LIGHT = toHexNumber( "#76d275" )
export const COLOR_DARK = toHexNumber( "#00701a" )

export const COLOR2_PRIMARY = toHexNumber( "#d81b60" )
export const COLOR2_LIGHT = toHexNumber( "#ff5c8d" )
export const COLOR2_DARK = toHexNumber( "#a00037" )


export const DEPTH_GRID = 9000
export const DEPTH_GRID_OVERLAY = 20000
export const DEPTH_MARKER = 900002
export const DEPTH_UNITS = 90000


