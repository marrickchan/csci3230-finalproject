$(document).ready(function(){
    // CREATE ELEMENTS ON PAGE
    var container = $('#legendarygemsapplet');
    var grLevelField = $('<input type="number" name="gemlevel" min="0" value="0">')
    var bsContainer = $('<div id="bloodShards">')
    var bsContainerDiv = $('<div>');
  
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
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });
    $(grLevelField).keyup(function(){
        updateBloodShards(bloodShardValue, bloodShardCap, $(grLevelField).val(), bsImage, bsContainerDiv);
    });
});

// Calculates the chance of leveling up your gem
function rollChance(greaterRift, gemLevel){
    return Math.min((greaterRift - gemLevel)*10, 10);
}

// Updates bloodshard value into the display based on the greater rift being done
function updateBloodShards(bsValue, bsCap, grLevel, bsImage, bsContainerDiv){
    bsValue = bsCap + (10*grLevel);
    $(bsContainerDiv).html('');
    $(bsContainerDiv).append(bsImage);
    $(bsContainerDiv).append(bsValue);
}