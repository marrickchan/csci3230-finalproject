$(document).ready(function(){ 

    // Legendary Gem Descriptions
    var gemNames = 
        [   'Bane of the Powerful',
            'Bane of the Trapped',
            'Enforcer',
            'Gem of Efficacious Toxin',
            'Gogok of Swiftness',
            'Invigorating Gemstone',
            'Mirinae, Teardrop of the Starweaver',
            'Moratorium',
            'Pain Enhancer',
            'Simplicity\'s Strength',
            'Taeguk',
            'Wreath of Lightning',
            'Zei\'s Stone of Vengeance',
            'Boon of the Hoarder',
            'Esoteric Alteration',
            'Gem of Ease',
            'Molten Wildebeest\'s Gizzard',
            'Iceblink',
            'Mutilation Guard',
            'Bane of the Stricken'
        ];
    var gemEffects = 
        [   'Gain 20% increased damage for 30.0 seconds after killing an elite pack.\n'+
                'Gain 15% increased damage versus elites and take 15% reduced damage from elites. (Requires Rank 25)',
            'Increase damage against enemies under the effects of control-impairing effects by 15.00%\n' +
                'Gain an aura that reduces the movement speed of enemies within 15 yards by 30%. (Requires Rank 25)',
            'Increase the damage of your pets by 15.00%\n'+
                'Your pets take 90% less damage. (Requires Rank 25)',
            'Poison all enemies hit for 2000% weapon damage over 10 seconds.\n' + 
                'All enemies you poison take 10% increased damage from all sources and deal 10% less damage. (Requires Rank 25)',
            'Gain Swiftness with every attack, increasing your Attack Speed by 1% and Dodge by 0.50% for 4 seconds. This effect stacks up to 15 times.\n'+
                'Gain 1% Cooldown Reduction per stack of Swiftness. (Requires Rank 25)',
            'Each hit done increases the healing received by 1.00% for 5 seconds. Stacks up to 10 times.\n' +
                'You are immune to control impairing effects. (Requires Rank 25)',
            '15% chance on hit to smite a nearby enemy for 3000% weapon damage as Holy and heal yourself for 3% of your maximum life.\n'+
                'Smite a nearby enemy every 3 seconds. (Requires Rank 25)',
            '35% of all damage taken is instead staggered and dealt to you over 3.00 seconds\n' +
                '20% chance on kill to clear all staggered damage. (Requires Rank 25)',
            'Critical hits cause the enemy to bleed for 2,500.0% weapon damage as Physical over 3 seconds.\n' +
                'Gain Blood Frenzy, granting you 3% increased Attack Speed for each bleeding enemy within 20 yards. (Requires Rank 25)',
            'Increase the damage of your primary skills by 25.00%\n' +
                'Primary Skills heal you for 4% of maximum Life on hit. (Requires Rank 25)',
            'Gain 2.00% increased damage for 1.5 seconds when you spend resource on a channel skill. This effect stacks up to 10 times\n' +
                'Gain 2.0% increased Armor for every stack. (Requires Rank 25)',
            '15% chance on hit to gain a Wreath of Lightning, dealing 1,200% weapon damage as Lightning every second to nearby enemies for 3 seconds\n' +
                'While under the effect of the Wreath of Lightning, gain 25% increased movement speed. (Requires Rank 25)',
            'Damage you deal is increased by 4.00% for every 10 yards between you and the enemy hit. Maximum 20.00% increase at 50 yards.\n' +
                '20% chance on hit to Stun the enemy or 1 second',
            '25.0% chance on killing an enemy to cause an explosion of gold.\n' +
                'Gain 30% increased movement speed for 2 seconds after picking up gold. (Requires Rank 25)',
            'Gain 10.0% non-Physical damage reduction.\n' + 
                'While below half Life, your resistances to Cold, Fire, Lightning, Poison, and Arcane are increased by 75%. (Requires Rank 25)',
            'Monster kills grant +500 experience.\n' + 
                'Level Requirement Set to 1. (Requires Rank 25)',
            'Regenerates 10,000 Life per Second.\n' +
                'After not taking damage for 4 seconds, gain an absorb shield for 200% of your total Life per Second. (Requires Rank 25)',
            'Your Cold skills now apply Chill effects and your Chill effects now Slow enemy movement speed by an additional 5.0%\n' + 
                'Enemies you Chill have a 10% increased chance to be Critically Hit. (Requires Rank 25)',
            'Gain 10.0% melee damage reduction\n' + 
                'While below 50% Life, you may move unhindered through enemies. (Requires Rank 25)',
            'Each attack you make against an enemy increases the damage it takes from your attacks by 0.80%\n' +
                'Gain 25% increased damage against bosses and Rift Guardians. (Requires Rank 25)'
        ];


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
    var gemTitle = $('<h1>');
    var gemDescription = $('<p>');
    var gemInformation = $('<div id="gemDescription">');
    // Creating Spots for the Gem Images
    for(var i = 1 ; i < gemCount; i++){
        if(i == 11){
            var nextLine = $('<p>');
            $(container).append(nextLine);
        }

        // Create 2 rows of gems
        if(i < 11){
            
            var gems = $('<img alt="' + i + '" src="images/' + i + '.png">');
            $(gemsFirstRow).append(gems);
            if(i == 1){
                $(gems).toggleClass('gemClicked');
                $(gemTitle).html(gemNames[$(gems).attr('alt')]);
                $(gemDescription).html(gemEffects[$(gems).attr('alt')]);
            }
        } else {
            var gems = $('<img alt="' + i + '" src="images/' + i + '.png">');
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
            $(gemTitle).html(gemNames[$(this).attr('alt')]);
            $(gemDescription).html(gemEffects[$(this).attr('alt')]);
        

            // To add display tooltip functionality
        });
    }
    $(container).append(gemsFirstRow);
    $(container).append(gemsSecondRow);
    
    // Add container for gem descriptions
    $(gemInformation).append(gemTitle);
    $(gemInformation).append(gemDescription)
    $(container).append(gemInformation);


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

    // --------------------
    // Results Section     |
    // --------------------    
    $(percentDiv).append(percentOne);
    $(percentDiv).append(percentTwo);
    $(percentDiv).append(percentThree);
    $(container).append(percentDiv);

    // ----------------------
    // Gem Upgrade Section   |
    // ----------------------
    $(gemContainer).append('<h1>Legendary Gem Level</h1>');
    $(gemContainer).append(gemLevelField);
    $(container).append(gemContainer);
    //$(gemUpgradeBoxDiv).append('<p>100% Upgrade: </p>');
    //$(gemUpgradeBoxDiv).append(gemGuaranteeCheckbox);
    $(gemContainer).append('<p style="display:inline">   100% Upgrade: </p>');
    $(gemContainer).append(gemGuaranteeCheckbox);
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
