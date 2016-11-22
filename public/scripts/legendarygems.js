$(document).ready(function(){ 
    // CREATE ELEMENTS ON PAGE
    var container = $('#legendarygemsapplet');
    var grLevelField = $('<input type="number" name="grlevel" min="0" value="0">');
    var bsContainer = $('<div id="bloodShards">');
    var bsContainerDiv = $('<div>');
    var gemLevelField = $('<input type="number" name="gemLevel" min="0" value="0">');
    var gemGuaranteeCheckbox = $('<input type="checkbox">');
    var gemContainer = $('<div id="gemLevel">');
    var gemContainerDiv = $('<div>');
    var percentOne = $('<p>');
    var percentTwo = $('<p>');
    var percentThree = $('<p>');

    // ----------------------
    // Legendary Gem Section |
    // ----------------------
    // Gem Count
    var gemCount = 21;
    // Creating Spots for the Gem Images
    for(var i = 1 ; i < gemCount; i++){
        var gems = $('<img src="images/' + i + '.png">');
        $(container).append(gems);
        $(gems).click(function(event){
            $(this).toggleClass('gemSelected');
        });
    }
    
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
    $(bsContainer).html('Greater Rift: ');
    $(bsContainer).append(grLevelField); // Add input field
    $(bsContainer).append(bsContainerDiv);
    $(container).append(bsContainer);
    // END CREATING ELEMENTS ON PAGE

    // Updating Blood Shard Values when Changing the input field
    $(grLevelField).change(function(){
        $(percentOne).html('');
        $(percentTwo).html('');
        $(percentThree).html('');
        $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0));
        $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1));
        $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2));
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });
    $(grLevelField).keyup(function(){
        $(percentOne).html('');
        $(percentTwo).html('');
        $(percentThree).html('');
        $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0));
        $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1));
        $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2));
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });

    // --------------------
    // Results Section     |
    // --------------------
    $(gemContainer).append(gemLevelField);
    $(gemContainer).append(gemGuaranteeCheckbox);
    $(gemContainerDiv).append(percentOne);
    $(gemContainerDiv).append(percentTwo);
    $(gemContainerDiv).append(percentThree);
    $(gemContainer).append(gemContainerDiv);
    $(container).append(gemContainer);

    $(gemLevelField).change(function(){
        $(percentOne).html('');
        $(percentTwo).html('');
        $(percentThree).html('');
        $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0));
        $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1));
        $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2));
    });

    $(gemLevelField).keyup(function(){
        $(percentOne).html('');
        $(percentTwo).html('');
        $(percentThree).html('');
        $(percentOne).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 0));
        $(percentTwo).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 1));
        $(percentThree).append(rollChance($(grLevelField).val(), $(gemLevelField).val(), 2));
    });

});

// Calculates the chance of leveling up your gem
// CHECK THIS CALCULATION
function rollChance(greaterRift, gemLevel, rollNumber){
    console.log("gr level: " + greaterRift + " gem level: " + gemLevel);
    var subtracted = (greaterRift - (parseInt(gemLevel) + parseInt(rollNumber))) * 10;
    console.log("subtraction: " + subtracted);
    if(subtracted > 0 && subtracted <= 100){
        return subtracted;
    } else if (subtracted > 100){
        return 100;
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
