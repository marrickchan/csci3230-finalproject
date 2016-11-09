$(document).ready(function(){
    // CREATE ELEMENTS ON PAGE
    var container = $('#legendarygemsapplet');
    var generalDiv = $('<div class="container">');
    var bsContainer = $('<div id="bloodShards">')
    
    
    // ----------------------
    // Legendary Gem Section |
    // ----------------------
    // Gem Count
    var gemCount = 21;
    // Creating Spots for the Gem Images
    for(var i = 1 ; i < gemCount; i++){
        var gems = $('<img src="images/' + i + '.png">');
        $(generalDiv).append(gems);
        $(gems).click(function(event){
            $(this).addClass('gemSelected');
        });
    }
    // Add Gems to page
    $(container).append(generalDiv);
    
    // --------------------
    // Blood Shard Section |
    // --------------------    
    // Blood Shard Caps = 500 + (GreaterRift Level * 10)
    var bloodShardCap = 500;
    $(container).append(bsContainer);
    updateBloodShards(bloodShardCap, bsContainer);
    // END CREATING ELEMENTS ON PAGE
    
});

// Calculates the chance of leveling up your gem
function rollChance(greaterRift, gemLevel){
    return Math.min((greaterRift - gemLevel)*10, 10);
}

// Updates bloodshard value into the display based on the greater rift being done
function updateBloodShards(bsValue, bsContainer){
    $(bsContainer).html(' ');
    var bsImage = $('<img src="images/bloodshard.png">');
    $(bsContainer).append(bsImage);
    $(bsContainer).append('Blood Shards: ' + bsValue);
}