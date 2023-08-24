import { SPRITECOLORMATRIX, SPRITES_1 } from '../Sprites/SpriteMap.js';
import * as gf from '../Utils/gf.js';
export default class Castle{
    constructor(scene,mult= 2){
        this.scene = scene;
        var canvasOriginal = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.castle,mult);
        // var canvasOriginal = SPRITES_1.gnifiedcastle',mult);
        var skele = gf.getCanvasSkeleton(canvasOriginal);

        var outerprint = gf.colorsMatrixToSprite(skele['#6a6a6a']);
        var bodyprint = gf.colorsMatrixToSprite(skele['#c2c2c2']);

        var outer_dirt1 = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.dirt,.5));
        var outer_grass = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.grass,.5));
        var outer_water = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.water,.5));
        var outer_brick = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.brick,.5));
        var outer_steel = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.steel,.5));
        var outer_magic = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.magic,.5));
        
        var body_dirt1 = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.dirt,.2));
        var body_grass = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.grass,.2));
        var body_water = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.water,.2));
        var body_brick = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.brick,.2));
        var body_steel = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.steel,.2));
        var body_magic = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.magic,.2));

        this.dirt =     gf.combineSprites([canvasOriginal,body_dirt1,outer_dirt1]);
        this.grass =    gf.combineSprites([canvasOriginal,body_grass,outer_grass]);
        this.water =    gf.combineSprites([canvasOriginal,body_water,outer_water]);
        this.brick =    gf.combineSprites([canvasOriginal,body_brick,outer_brick]);
        this.steel =    gf.combineSprites([canvasOriginal,body_steel,outer_steel]);
        this.magic =    gf.combineSprites([canvasOriginal,body_magic,outer_magic]);

    }

    update(time){
        this.time = time;

    }

}