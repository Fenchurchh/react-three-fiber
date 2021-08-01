import { COLOR_PRIMARY, DEPTH_GRID, DEPTH_GRID_OVERLAY, DEPTH_UNITS } from "./constants";
import { defineGrid, extendHex } from 'honeycomb-grid'

const SCALE = 0.4

const Hex = extendHex( {
  size: {
    height: 90*SCALE,
    width: 210*SCALE
  },
  orientation: "flat"
} )
const Grid = defineGrid( Hex )

let grid = Grid.rectangle( { width: 4, height: 4 } )
window.grid = grid

export class Board extends Phaser.GameObjects.Group {
  constructor( scene, config ) {
    super( scene )
    const graphics = scene.add.graphics( {
      lineStyle: {
        width: 1,
        color: COLOR_PRIMARY,
        alpha: 0.3
      }
    } )
    
    graphics.clear();
    graphics.beginPath();
    graphics.setDepth( DEPTH_GRID_OVERLAY )
    const MAGIC_OFFSET = 42*SCALE
    const center = Hex().center()
    Grid.rectangle( { width: 32, height: 32 } ).forEach( hex => {
      const point = hex.toPoint()
      let sprite = scene.add.sprite( point.x + center.x, point.y + center.y + MAGIC_OFFSET, "tile" )
      sprite.setScale( SCALE )
      sprite.setOrigin( 0.5, 0.75 )
      sprite.alpha = 1
      sprite.setDepth( DEPTH_GRID + point.y )
      // add the hex's position to each of its corner points
      const corners = hex.corners().map( corner => corner.add( point ) )
      // separate the first from the other corners
      const [firstCorner, ...otherCorners] = corners
      // move the "pen" to the first corner
      graphics.moveTo( firstCorner.x, firstCorner.y )
      // draw lines to the other corners
      otherCorners.forEach( ( { x, y } ) => graphics.lineTo( x, y ) )
      // finish at the first corner
      graphics.lineTo( firstCorner.x, firstCorner.y )
    } )
    
    graphics.closePath();
    graphics.strokePath();
    
    let p = scene.add.sprite( 200, 200, "panther" )
    p.setDepth( DEPTH_UNITS )
  }
}