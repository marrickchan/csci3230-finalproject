$(document).ready(function(){ 
    // CREATE ELEMENTS ON PAGE
    var container = $('#legendarygemsapplet');
    var grLevelField = $('<input type="number" name="grlevel" min="1" value="1">');
    var bsContainer = $('<div id="bloodShards">');
    var bsContainerDiv = $('<div>');
    var gemLevelField = $('<input type="number" name="gemLevel" min="0" value="0">');
    var gemGuaranteeCheckbox = $('<input type="checkbox">');
    var gemContainer = $('<div id="gemLevel">');
    var gemContainerDiv = $('<div>');
    var gemUpgradeBoxDiv = $('<div id="perfectUpgrade">');
    var percentDiv = $('<div id="percentages">');
    var percentOne = $('<p>');
    var percentTwo = $('<p>');
    var percentThree = $('<p>');
    $(percentOne).html('First Roll Chance: ');
    $(percentTwo).html('Second Roll Chance: ');
    $(percentThree).html('Third Roll Chance: ');

    // ----------------------
    // Legendary Gem Section |
    // ----------------------
    // Gem Count
    var gemCount = 21;
    var gemSelected = 
        [false, false, false, false, false, false, false,
        false, false, false, false, false, false, false,
        false, false, false, false, false, false, false];
    var gemsFirstRow = $('<div id="gemsFirstRow" class="gemImage">');
    var gemsSecondRow = $('<div id="gemsSecondRow" class="gemImage">');
    // Creating Spots for the Gem Images
    for(var i = 1 ; i < gemCount; i++){
        if(i == 11){
            var nextLine = $('<p>');
            $(container).append(nextLine);
        }

        // Create 2 rows of gems
        if(i < 11){
            var gems = $('<img src="images/' + i + '.png">');
            $(gemsFirstRow).append(gems);
        } else {
            var gems = $('<img src="images/' + i + '.png">');
            $(gemsSecondRow).append(gems);
        }
        
        
        // Highlight the gems
        $(gems).click(function(event){
            // Deselect the other gems
            $(gemsFirstRow).children('img').each(function(index, value){
                $(value).removeClass('gemClicked');    
            });
            $(gemsSecondRow).children('img').each(function(index, value){
                $(value).removeClass('gemClicked');
            });
    
            $(this).toggleClass('gemClicked');

            // To add display tooltip functionality
        });
    }
    $(container).append(gemsFirstRow);
    $(container).append(gemsSecondRow);
    
    // --------------------
    // Blood Shard Section |
    // --------------------    
    // Blood Shard Caps = 500 + (GreaterRift Level * 10)
    var bloodShardCap = 500;
    var bloodShardValue = bloodShardCap;
    // Add image to bloodshard values section then into bloodshard container
    var bsImage = $('<img src="images/bloodshard.png">'); // Add bs image
    $(bsContainerDiv).append(bsImage);
    $(bsContainerDiv).append(bloodShardValue);
    // Adding container (All of blood shards)
    $(bsContainer).append('<h1>Greater Rift Level</h1>');
    $(bsContainer).append(grLevelField); // Add input field
    $(bsContainer).append(bsContainerDiv);
    $(container).append(bsContainer);
    // END CREATING ELEMENTS ON PAGE

    // Updating Blood Shard Values when Changing the input field
    $(grLevelField).change(function(){
        if($(gemGuaranteeCheckbox).prop('checked')){
            $(percentOne).html('First Roll Chance: 100 %');
            $(percentTwo).html('Second Roll Chance: 100 %');
            $(percentThree).html('Third Roll Chance: 100 %');
            $(gemLevelField).val(parseInt($(grLevelField).val()) - 12);
        } else {
            $(percentOne).html('First Roll Chance: ');
            $(percentTwo).html('Second Roll Chance: ');
            $(percentThree).html('Third Roll Chance: ');
            $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0) + " %");
            $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1) + " %");
            $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2) + " %");
        }
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });

    $(grLevelField).keyup(function(){
        if($(gemGuaranteeCheckbox).prop('checked')){
            $(percentOne).html('First Roll Chance: 100 %');
            $(percentTwo).html('Second Roll Chance: 100 %');
            $(percentThree).html('Third Roll Chance: 100 %');
            $(gemLevelField).val(parseInt($(grLevelField).val()) - 12);
        } else {
            $(percentOne).html('First Roll Chance: ');
            $(percentTwo).html('Second Roll Chance: ');
            $(percentThree).html('Third Roll Chance: ');
            $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0) + " %");
            $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1) + " %");
            $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2) + " %");
        }
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });

    // ----------------------
    // Gem Upgrade Section   |
    // ----------------------
    $(gemContainer).append('<h1>Legendary Gem Level</h1>');
    $(gemContainer).append(gemLevelField);
    $(container).append(gemContainer);
    $(gemUpgradeBoxDiv).html('100% Upgrade: ');
    $(gemUpgradeBoxDiv).append(gemGuaranteeCheckbox);
    $(container).append(gemUpgradeBoxDiv);
    $(gemGuaranteeCheckbox).change(function(){
        // If user wants 100% checkrate
        if(this.checked){
            $(percentOne).html('First Roll Chance: 100 %');
            $(percentTwo).html('Second Roll Chance: 100 %');
            $(percentThree).html('Third Roll Chance: 100 %');
            $(grLevelField).val(parseInt($(gemLevelField).val()) + 12);
            updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
        }
    });

    // --------------------
    // Results Section     |
    // --------------------    
    $(percentDiv).append(percentOne);
    $(percentDiv).append(percentTwo);
    $(percentDiv).append(percentThree);
    $(container).append(percentDiv);

    $(gemLevelField).change(function(){
        if($(gemGuaranteeCheckbox).prop('checked')){
            $(percentOne).html('First Roll Chance: 100 %');
            $(percentTwo).html('Second Roll Chance: 100 %');
            $(percentThree).html('Third Roll Chance: 100 %');
            $(grLevelField).val(parseInt($(gemLevelField).val()) + 12);
            updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
        } else {
            $(percentOne).html('First Roll Chance: ');
            $(percentTwo).html('Second Roll Chance: ');
            $(percentThree).html('Third Roll Chance: ');
            $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0) + " %");
            $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1) + " %");
            $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2) + " %");
        }
    });

    $(gemLevelField).keyup(function(){
        if($(gemGuaranteeCheckbox).prop('checked')){
            $(percentOne).html('First Roll Chance: 100 %');
            $(percentTwo).html('Second Roll Chance: 100 %');
            $(percentThree).html('Third Roll Chance: 100 %');
            $(grLevelField).val(parseInt($(gemLevelField).val()) + 12);
            updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
        } else {
            $(percentOne).html('First Roll Chance: ');
            $(percentTwo).html('Second Roll Chance: ');
            $(percentThree).html('Third Roll Chance: ');
            $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0) + " %");
            $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1) + " %");
            $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2) + " %");
        }
    });

});

// Calculates the chance of leveling up your gem
// CHECK THIS CALCULATION
function rollChance(greaterRift, gemLevel, rollNumber){
    var subtracted = (greaterRift - (parseInt(gemLevel) + parseInt(rollNumber)));
    if (subtracted >= 10){
        return 100;
    } else if (subtracted >= 9){
        return 90;
    } else if (subtracted >= 8){
        return 80;
    } else if (subtracted >= 7){
        return 70;
    } else if (subtracted >= 0){
        return 60;
    } else if (subtracted >= -1){
        return 30;
    } else if (subtracted >= -2){
        return 15;
    } else if (subtracted >= -3){
        return 8;
    } else if (subtracted >= -4){
        return 4;
    } else if (subtracted >= -5){
        return 2;
    } else if (subtracted >= -15){
        return 1;
    }
    return 0;
}

// Updates bloodshard value into the display based on the greater rift being done
function updateBloodShards(bsValue, bsCap, grLevel, bsImage, bsContainerDiv){
    bsValue = bsCap + (10*grLevel);
    $(bsContainerDiv).html('');
    $(bsContainerDiv).append(bsImage);
    $(bsContainerDiv).append(bsValue);
}
