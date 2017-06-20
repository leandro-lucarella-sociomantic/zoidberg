import exportKeyframeCss from 'exporter/keyframe.css.exporter';
import Zoidberg from 'zoidberg';


describe( 'Export Keyframes CSS', () =>
{

    let keyframes, testState1, testState2, testState3, testState4, testState5;

    before( () =>
    {
        const zoidberg  = Zoidberg();
        const keyframe1 = zoidberg.createKeyframe( { name : 'bounce', markers : ['40%'], props : { width : '10px' } } );
        const keyframe2 = zoidberg.createKeyframe( { name : 'bounce', markers : ['10%'], props : { width : '50px' } } );
        const keyframe3 = zoidberg.createKeyframe( { name : 'zoom', markers : ['20%', '50%'], props : { color : 'red', height : '5%' } } );

        keyframes = [keyframe1, keyframe2, keyframe3];

        testState1 = { name : 'bounce' };
        testState2 = { name : 'bounce', markers : ['10%'] };
        testState3 = { name : 'jiggle' };
        testState4 = [ { name : 'crossFade', markers : ['5%'], props : { height : '10px' } }, { name : 'crossFade', markers : ['100%'], props : { height : '20px' } } ];
        testState5 = [keyframes[0].getState(), keyframes[1].getState()];
    } );


    it( 'if no state is passed, should export all keyframes', () =>
    {
        expect( exportKeyframeCss( undefined, undefined, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}', '\n@keyframes zoom {\n    20%, 50% {\n        color:                      red;\n        height:                     5%;\n    }\n}' ] );
    } );

    it( 'if a state is passed that matches specific keyframes, should export those keyframes', () =>
    {
        expect( exportKeyframeCss( undefined, testState1, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}'] );
        expect( exportKeyframeCss( undefined, testState2, keyframes ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n}'] );
    } );

    it( 'if a state is passed that matches no keyframes, should return an empty array', () =>
    {
        expect( exportKeyframeCss( undefined, {}, keyframes ) ).to.eql( [] );
        expect( exportKeyframeCss( undefined, testState3, keyframes ) ).to.eql( [] );
    } );

    it( 'if spacing related formatting options are passed, should space the css accordingly', () =>
    {
        expect( exportKeyframeCss( { outerIndent : 6, innerIndent : 6, rpad : 15 }, undefined, keyframes ) ).to.eql( ['\n@keyframes bounce {\n      10% {\n      width:         50px;\n      }\n      40% {\n      width:         10px;\n      }\n}', '\n@keyframes zoom {\n      20%, 50% {\n      color:         red;\n      height:        5%;\n      }\n}'] );
    } );

    it( 'if no collection is passed, should export the states of the passed keyframes', () =>
    {
        expect( exportKeyframeCss( {}, testState4 ) ).to.eql( [ '\n@keyframes crossFade {\n    5% {\n        height:                     10px;\n    }\n    100% {\n        height:                     20px;\n    }\n}' ] );
        expect( exportKeyframeCss( {}, testState5 ) ).to.eql( ['\n@keyframes bounce {\n    10% {\n        width:                      50px;\n    }\n    40% {\n        width:                      10px;\n    }\n}' ] );
    } );

} );