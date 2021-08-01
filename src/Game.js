import { Board } from "./Board";
import { COLOR2_DARK, COLOR2_LIGHT, COLOR_DARK, COLOR_LIGHT } from "./constants";

import tileUrl from "./assets/hex/Isometric/grass_E.png"
import pantherUrl from "./Panther D.png"

class Demo extends Phaser.Scene {
  preload() {
    this.load.image( "tile", tileUrl )
    this.load.image( "panther", pantherUrl )
  }
  
  create() {
    
    this.add.existing( new Board( this ) )
    
  }
}

const getHexagonGrid = function ( scene ) {
  const staggerAxis = "x";
  const staggerIndex = 'odd';
  return scene.rexBoard.add.hexagonGrid( {
    x: 45,
    y: 45,
    size: 18,
    staggerAxis,
    staggerIndex
  } )
  
}

class Blocker extends RexPlugins.Board.Shape {
  constructor( board, tileXY ) {
    const scene = board.scene;
    if ( tileXY === undefined ) {
      tileXY = board.getRandomEmptyTileXY( 0 );
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super( board, tileXY.x, tileXY.y, 0, COLOR_DARK );
    scene.add.existing( this );
  }
}

class Piece extends RexPlugins.Board.Shape {
  constructor( board, tileXY ) {
    const scene = board.scene;
    if ( tileXY === undefined ) {
      tileXY = board.getRandomEmptyTileXY( 0 );
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super( board, tileXY.x, tileXY.y, 0, COLOR_LIGHT );
    scene.add.existing( this );
    this.setDepth( 1 );
    
    // add behaviors
    this.moveTo = scene.rexBoard.add.moveTo( this );
    this.pathFinder = scene.rexBoard.add.pathFinder( this, {
      occupiedTest: true
    } );
    // private members
    this._movingPoints = 4;
    this._markers = [];
  }
  
  showMoveableArea() {
    this.hideMoveableArea();
    const tileXYArray = this.pathFinder.findArea( this._movingPoints );
    for ( var i = 0, cnt = tileXYArray.length; i < cnt; i++ ) {
      this._markers.push(
        new MoveableMarker( this, tileXYArray[ i ] )
      );
    }
    return this;
  }
  
  hideMoveableArea() {
    for ( var i = 0, cnt = this._markers.length; i < cnt; i++ ) {
      this._markers[ i ].destroy();
    }
    this._markers.length = 0;
    return this;
  }
  
  moveToTile( endTile ) {
    if ( this.moveTo.isRunning ) {
      return false;
    }
    var tileXYArray = this.pathFinder.getPath( endTile.rexChess.tileXYZ );
    this.moveAlongPath( tileXYArray );
    return true;
  }
  
  moveAlongPath( path ) {
    if ( path.length === 0 ) {
      this.showMoveableArea();
      return;
    }
    
    this.moveTo.once( 'complete', function () {
      this.moveAlongPath( path );
    }, this );
    this.moveTo.moveTo( path.shift() );
    return this;
  }
}

class MoveableMarker extends RexPlugins.Board.Shape {
  constructor( chess, tileXY ) {
    var board = chess.rexChess.board;
    var scene = board.scene;
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super( board, tileXY.x, tileXY.y, -1, COLOR2_DARK );
    scene.add.existing( this );
    this.setScale( 0.5 );
    
    // on pointer down, move to this tile
    this.on( 'board.pointerdown', function () {
      if ( !chess.moveToTile( this ) ) {
        return;
      }
      this.setFillStyle( COLOR2_LIGHT );
    }, this );
  }
}


const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Demo,
  plugins: {
    scene: [{
      key: 'rexBoard',
      plugin: rexboardplugin,
      mapping: 'rexBoard'
    }]
  }
};

var game = new Phaser.Game( config );

export default game