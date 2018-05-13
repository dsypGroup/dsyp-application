/**
 * Created by yasadaraw on 4/1/2018.
 */
import Ember from 'ember';

export function calculate(units, bool) {
    var charge_00 = 7.85;
    var charge_60 = 10;
    var charge_90 = 27.75;
    var charge_120 = 32;
    var charge_180 = 45;
    var chargeStep1 = 60*charge_00;
    var chargeStep2 = 90*charge_60;
    var chargeStep3 = 120*charge_90;
    var chargeStep4 = 180*charge_120;

    if (arguments.length < 1){
        throw new Error("Handlebars Helper equal needs 2 parameters");
    }

    if (units < 60 || units ==0 ) {
        return Number(units * charge_00).toFixed(2);
    } else if (units > 60 && units < 90) {
        return ((units - 60) * charge_60) + chargeStep1;
    } else if (units > 90 && units < 120){
        return ((units - 90) * charge_90) + chargeStep2;
    } else if (units > 120 && units < 180) {
        return ((units - 120) * charge_120) + chargeStep3 ;
    } else {
        return ((units - 180) * charge_180) + chargeStep4 ;
    }
}

export default Ember.Helper.helper(calculate);