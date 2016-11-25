
function loadData(profileName, gameTag){
    var errorCheck = "The account could not be found.";
	var noSeasons = "The account was found, but no seasonal data could be obtained."
    var seasonCount = 8;
		
	// Hide the error message
	$('#errorMessage').removeClass('visible').addClass('invisible').text('');
	
    // REMEMBER TO FILL IN USERNAME AND TAG IN FIELD
    $.getJSON('https://us.api.battle.net/d3/profile/' + profileName + '%23' + gameTag + '/?locale=en_US&apikey=yn2njqfvwkbv2reb46zfczexj4sk7dst', function(data){
        // Load data
        // Make sure that the profile can be found
        // Return message if not found
        if(data.reason === errorCheck){
			$('#errorMessage').removeClass('invisible').addClass('visible').text(errorCheck);
            console.log('detected');
        } else {
            // Find all season stats
            
			// Set a flag to clear the existing data
			// We do this in case a profile is found but no data is found for that profile
			var wipe = false;
			
			for(var i = seasonCount; i >= 0; i--) {
                var season = 'season' + i;
                var seasonCurrent = data.seasonalProfiles[season];
                // Only pull if season was played
                if(seasonCurrent != undefined){
										
					// Once a season with data is found we will empty the existing data
					if (wipe==false){
						$('#seasonstats').empty();
						wipe = true;											
					}
									
                    // Pull Data
                    var sdiv = $('<div>');
                    $(sdiv).addClass('season');
                    var stitle = $('<div>');
                    $(stitle).html('Season '+i);
                    $(stitle).addClass('accHeader');
                    var scontent = $('<div>');
                    $(scontent).addClass('accContent');
                    var s_paragonLevel = $('<p>');
                    $(s_paragonLevel).html("Paragon Level: " + seasonCurrent.paragonLevel);
                    $(scontent).append(s_paragonLevel);
                    var s_monsterkills = $('<p>');
                    $(s_monsterkills).html("Monster Kills: " + seasonCurrent.kills.monsters);
                    $(scontent).append(s_monsterkills);
                    var s_elitekills = $('<p>');
                    $(s_elitekills).html("Elite Kills: " + seasonCurrent.kills.elites);
                    $(scontent).append(s_elitekills);
                    var s_barb = $('<p>');
                    $(s_barb).html("Barbarian Time Played: " + (100 * seasonCurrent.timePlayed.barbarian) + "h");
                    $(scontent).append(s_barb);
                    var s_crusader = $('<p>');
                    $(s_crusader).html("Crusader Time Played: " + (100 * seasonCurrent.timePlayed.crusader) + "h");
                    $(scontent).append(s_crusader);
                    var s_demonhunter = $('<p>');
                    $(s_demonhunter).html("Demon Hunter Time Played: " + (100* seasonCurrent.timePlayed['demon-hunter']) + "h");
                    $(scontent).append(s_demonhunter);
                    var s_monk = $('<p>');
                    $(s_monk).html("Monk Time Played: " + (100 * seasonCurrent.timePlayed.monk) + "h");
                    $(scontent).append(s_monk);
                    var s_witchdoctor = $('<p>');
                    $(s_witchdoctor).html("Witch Doctor Time Played: " + (100 * seasonCurrent.timePlayed['witch-doctor']) + "h");
                    $(scontent).append(s_witchdoctor);
                    var s_barbTime = $('<p>');
                    $(s_barbTime).html("Barbarian Time Played: " + (100 * seasonCurrent.timePlayed.barbarian) + "h");
                    $(scontent).append(s_barbTime);
                    var s_highestHardcore = $('<p>');
                    $(s_highestHardcore).html("Highest Hardcore Level: " + seasonCurrent.highestHardcoreLevel + "h");
                    $(scontent).append(s_highestHardcore);
                    var s_completeA1 = $('<p>');
                    $(s_completeA1).html("Completed Act 1: " + completed(seasonCurrent.progression.act1));
                    $(scontent).append(s_completeA1);
                    var s_completeA2 = $('<p>');
                    $(s_completeA2).html("Completed Act 2: " + completed(seasonCurrent.progression.act2));
                    $(scontent).append(s_completeA2);
                    var s_completeA3 = $('<p>');
                    $(s_completeA3).html("Completed Act 3: " + completed(seasonCurrent.progression.act3));
                    $(scontent).append(s_completeA3);
                    var s_completeA4 = $('<p>');
                    $(s_completeA4).html("Completed Act 4: " + completed(seasonCurrent.progression.act4));
                    $(scontent).append(s_completeA4);
                    var s_completeA5 = $('<p>');
                    $(s_completeA5).html("Completed Act 5: " + completed(seasonCurrent.progression.act5));
                    $(scontent).append(s_completeA5);
									
                    $(sdiv).append(stitle);
                    $(sdiv).append(scontent);										
									
                    // Add season into container
                    $('#seasonstats').append(sdiv);
                }   
            }
						
    		// Set an error message if the profile was found but no season data was pulled
    		if(wipe==false){
    			$('#seasonstats').empty();
    			$('#errorMessage').removeClass('invisible').addClass('visible').text(noSeasons);
    		}

            // Create Accordion
            $('.season').accordion({
               collapsible:true,
               active: false
            });
        }
    });   
}

function completed(input){
    if(input === false){
        return "No";
    } else if(input === true){
        return "Yes";
    }
}

function fetchLeaderboards(season, searchString){
    // Clear results section before putting new one
    $('#leaderboardResults').html('');
    
    $(tr_first).append(th_order);
    var tablediv = $('<div class="table-responsive">');
    var table = $('<table class="table table-striped table-hover">');
    var tr_first = $('<tr>');
    var rank = $('<th>');
    var th_order = $('<th>');
    $(th_order).html('Rank Number');
    var th_grlevel = $('<th>');
    $(th_grlevel).html('Greater Rift Level');
    var th_battletag = $('<th>');
    $(th_battletag).html('Battle Tag');
    var th_herolevel = $('<th>');
    $(th_herolevel).html('Hero Level');
    var th_paragonlevel = $('<th>');
    $(th_paragonlevel).html('Paragon Level');
    var th_clantag = $('<th>');
    $(th_clantag).html('Clan Tag');
    var th_clanname = $('<th>');
    $(th_clanname).html('Clan Name');
    $(tr_first).append(th_order);
    $(tr_first).append(th_grlevel);
    $(tr_first).append(th_battletag);
    $(tr_first).append(th_herolevel);
    $(tr_first).append(th_paragonlevel);
    $(tr_first).append(th_clantag);
    $(tr_first).append(th_clanname);
    $(table).append(tr_first);
    

    // Error Check
    var errorCheck = "Not found";
    $.getJSON('https://us.api.battle.net/data/d3/season/' + season + '/leaderboard/' + searchString + '?access_token=xtrg4srrjm3jpamge33uazfe', function(data){
        // data.row[0].data[0].number // Rank
        // data.row[0].data[1].number // GR Level
        // data.row[0].data[4].string // Battle Tag
        // data.row[0].player.data[4].number // Hero Level
        // data.row[0].player.data[5].number // Paragon Level
        // data.row[0].player.data[6].string // Clan tag
        // data.row[0].player.data[7].string // Clan Name
        
        if(data.detail == errorCheck){

        } else {
            console.log(data.row[2].data[4].string);
            
            for(var i = 0; i < 100; i++){
                var tr_row = $('<tr>');
                var td_order = $('<th>');
                $(td_order).html(data.row[i].data[0].number);
                $(tr_row).append(td_order);
                var td_grlevel = $('<th>');
                $(td_grlevel).html(data.row[i].data[1].number);
                $(tr_row).append(td_grlevel);

                var td_battletag = $('<th>');
                if(data.row[i].data.length < 5){
                    $(td_battletag).html('N/A');    
                } else {
                    $(td_battletag).html(data.row[i].data[4].string);    
                }
                
                if(data.row[i].player[0].data.length == 8){
                    $(tr_row).append(td_battletag);
                    var td_herolevel = $('<th>');
                    $(td_herolevel).html(data.row[i].player[0].data[3].number);
                    console.log("Hero Level: " + data.row[i].player[0].data[3].number);
                    $(tr_row).append(td_herolevel);
                    var td_paragonlevel = $('<th>');
                    $(td_paragonlevel).html(data.row[i].player[0].data[4].number);
                    console.log("Paragon Level: " + data.row[i].player[0].data[4].number);
                    console.log("Size of Data: " + data.row[i].player[0].data.length);
                    $(tr_row).append(td_paragonlevel);


                    // Check if they are in a clan
                    var td_clantag = $('<th>');
                    var td_clanname = $('<th>');
                    if(data.row[i].player[0].data.length < 9){
                        $(td_clantag).html('N/A');
                        $(td_clanname).html('N/A');
                    } else {
                        $(td_clantag).html(data.row[i].player[0].data[5].string);
                        $(td_clanname).html(data.row[i].player[0].data[6].string);
                    }
                    $(tr_row).append(td_clantag);
                    $(tr_row).append(td_clanname);
                } else if(data.row[i].player[0].data.length <= 9) {
                    $(tr_row).append(td_battletag);
                    var td_herolevel = $('<th>');
                    $(td_herolevel).html(data.row[i].player[0].data[4].number);
                    console.log("Hero Level: " + data.row[i].player[0].data[4].number);
                    $(tr_row).append(td_herolevel);
                    var td_paragonlevel = $('<th>');
                    $(td_paragonlevel).html(data.row[i].player[0].data[5].number);
                    console.log("Paragon Level: " + data.row[i].player[0].data[5].number);
                    console.log("Size of Data: " + data.row[i].player[0].data.length);
                    $(tr_row).append(td_paragonlevel);


                    // Check if they are in a clan
                    var td_clantag = $('<th>');
                    var td_clanname = $('<th>');
                    if(data.row[i].player[0].data.length < 9){
                        $(td_clantag).html('N/A');
                        $(td_clanname).html('N/A');
                    } else {
                        $(td_clantag).html(data.row[i].player[0].data[6].string);
                        $(td_clanname).html(data.row[i].player[0].data[7].string);
                    }
                    $(tr_row).append(td_clantag);
                    $(tr_row).append(td_clanname);
                }
                
                
                $(table).append(tr_row);

            }
            /*
            data.row[0].data[0].number
            data.row[0].data[1].number
            data.row[0].data[4].string
            data.row[0].player[0].data[4].number
            data.row[0].player[0].data[5].number
            data.row[0].player[0].data[6].string
            data.row[0].player[0].data[7].string*/
        }


    });

    $(tablediv).append(table);
    $('#leaderboardResults').append(tablediv);
}

$(document).ready(function(){	

    // Season Stats
    // NAVBAR COLLAPSIBLE
    // Button for Navbar
    $('.navbar-toggle').click(function(event){
        // Collapsed going to uncollapsed
        if($('.navbar-toggle').hasClass('collapsed')){
            $('.navbar-toggle').attr('aria-expanded','true');
            $('#bs-example-navbar-collapse-1').attr('aria-expanded','true');

        } else {
            $('.navbar-toggle').attr('aria-expanded','false');
            $('#bs-example-navbar-collapse-1').attr('aria-expanded','false');
        }
        
        $('.navbar-toggle').toggleClass('collapsed');
    });

    // Hide Search Again Button
    $('#searchAgain').addClass('invisible');

    // Search user
	$('#lookup').click(function(){
		
		var battleTag = $('#battletag').val();
		var identifier = $('#identifier').val();
		
		console.log(battleTag);
		console.log(identifier);
        $('#getBattleTag').addClass('invisible');
        $('#searchAgain').removeClass('invisible');
		loadData(battleTag, identifier);
		
	});

    $('#search').click(function(){
        $('#getBattleTag').removeClass('invisible');
        $('#searchAgain').addClass('invisible');
        $('#errorMessage').addClass('invisible');
        $('#seasonstats').empty();
    });
		
	
	// If the battleTag and identifier aren't empty on load then call loadData
	var battleTag = $('#battletag').val();
	var identifier = $('#identifier').val();
	if (battleTag!="" && identifier!=""){
        $('#getBattleTag').addClass('invisible');
        $('#searchAgain').removeClass('invisible');
		loadData(battleTag, identifier);
	}

    // Leaderboards

    $('#getLeaderboard').click(function(){
        console.log('pressed'); 
        fetchLeaderboards($('#seasonNumber').val(), $('#leaderboardType').val());
    });
    // https://us.api.battle.net/data/d3/season/{SEASON}/leaderboard/{SEARCH_STRING}?access_token=xtrg4srrjm3jpamge33uazfe
    /*
    "row": [
    {
        "player": [{
            "key": "7844953",
            "accountId": 7844953,
            "data": [{
                "id": "HeroBattleTag",
                "string": "JohnFox#1903"
            }, {
                "id": "GameAccount",
                "number": 7844953
            }, {
                "id": "HeroClass",
                "string": "barbarian"
            }, {
                "id": "HeroGender",
                "string": "m"
            }, {
                "id": "HeroLevel",
                "number": 70
            }, {
                "id": "ParagonLevel",
                "number": 390
            }, {
                "id": "HeroClanTag",
                "string": "HC"
            }, {
                "id": "ClanName",
                "string": "HC Hardcore"
            }, {
                "id": "HeroId",
                "number": 53225244
            }]
        }],
        "order": 61,
        "data": [{
            "id": "Rank",
            "number": 61
        }, {
            "id": "RiftLevel",
            "number": 35
        }, {
            "id": "RiftTime",
            "timestamp": 609816
        }, {
            "id": "CompletedTime",
            "timestamp": 1421200938000
        }, {
            "id": "BattleTag",
            "string": "JohnFox#1903"
        }]
    },
    */





    /** LAYOUT FOR HERO PROFILES ON DIABLO API
    
    // NEED TO GRAB PROFILES
    // LINK + API KEY
    // https://us.api.battle.net/d3/profile/{PROFILE NAME}%23{PROFILE TAG}/hero/{HERO ID}?locale=en_US&apikey=yn2njqfvwkbv2reb46zfczexj4sk7dst
    // Marrick's Profile for testing
    // Profile Name for testing: Testimony
    // Profile Tag: 1517
    // Hero ID: 47968380 (Season 8 Witch Doctor - TheDoctor)
    {
        "id": 47968380,
        "name": "TheDoctor",
        "class": "witch-doctor",
        "gender": 1,
        "level": 70,
        "kills": {
            "elites": 20082
        },
        "paragonLevel": 531,
        "hardcore": false,
        "seasonal": true,
        "seasonCreated": 8,
        "skills": {
            "active": [{
                "skill": {
                    "slug": "wall-of-death",
                    "name": "Wall of Death",
                    "icon": "witchdoctor_wallofzombies",
                    "level": 28,
                    "categorySlug": "decay",
                    "tooltipUrl": "skill/witch-doctor/wall-of-death",
                    "description": "Cooldown: 8 seconds\r\n\r\nRaise a wall of zombies 28 yards wide from the ground that blocks enemies and attacks them for 1200% weapon damage as Physical over 6 seconds.",
                    "simpleDescription": "Cooldown: 8 seconds\r\n\r\nRaise a wall of zombies that block enemies and attack them.",
                    "skillCalcId": "k"
                },
                "rune": {
                    "slug": "wall-of-death-c",
                    "type": "c",
                    "name": "Communing with Spirits",
                    "level": 60,
                    "description": "Summon a circle of spirits for 6 seconds that deals 1200% weapon damage as Cold, Chills nearby enemies by 60%, and reduces their damage dealt by 25% for 3 seconds.",
                    "simpleDescription": "Summon a circle of spirits that Chills all nearby enemies and reduces their damage dealt.",
                    "tooltipParams": "rune/wall-of-death/c",
                    "skillCalcId": "c",
                    "order": 4
                }
            }, {
                "skill": {
                    "slug": "piranhas",
                    "name": "Piranhas",
                    "icon": "witchdoctor_piranhas",
                    "level": 61,
                    "categorySlug": "decay",
                    "tooltipUrl": "skill/witch-doctor/piranhas",
                    "description": "Cost: 250 Mana\r\nCooldown: 8 seconds\r\n\r\nSummons a pool of deadly piranhas that deals 400% weapon damage as Poison over 8 seconds.  Affected enemies will also take 15% increased damage.",
                    "simpleDescription": "Cost: 250 Mana\r\nCooldown: 8 seconds\r\n\r\nSummons a pool of deadly piranhas that deals damage and causes affected enemies to take additional damage.",
                    "skillCalcId": "l"
                },
                "rune": {
                    "slug": "piranhas-c",
                    "type": "c",
                    "name": "Piranhado",
                    "level": 65,
                    "description": "The pool of piranhas becomes a tornado of piranhas that lasts 4 seconds.  Nearby enemies are periodically sucked into the tornado.\r\n\r\nIncreases the cooldown to 16 seconds.",
                    "simpleDescription": "A torrent of piranhas pull enemies into it.",
                    "tooltipParams": "rune/piranhas/c",
                    "skillCalcId": "b",
                    "order": 2
                }
            }, {
                "skill": {
                    "slug": "spirit-walk",
                    "name": "Spirit Walk",
                    "icon": "witchdoctor_spiritwalk",
                    "level": 16,
                    "categorySlug": "defensive",
                    "tooltipUrl": "skill/witch-doctor/spirit-walk",
                    "description": "Cooldown: 10 seconds\r\n\r\nLeave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.\r\n\r\nThis ability does not start its cooldown until after its effects expire.",
                    "simpleDescription": "Cooldown: 10 seconds\r\n\r\nLeave your physical body and enter the spirit realm to move faster.\r\n\r\nThis ability does not start its cooldown until after its effects expire.",
                    "skillCalcId": "U"
                },
                "rune": {
                    "slug": "spirit-walk-b",
                    "type": "b",
                    "name": "Jaunt",
                    "level": 23,
                    "description": "Increase the duration of Spirit Walk to 3 seconds.",
                    "simpleDescription": "Increase the duration of Spirit Walk.",
                    "tooltipParams": "rune/spirit-walk/b",
                    "skillCalcId": "a",
                    "order": 0
                }
            }, {
                "skill": {
                    "slug": "soul-harvest",
                    "name": "Soul Harvest",
                    "icon": "witchdoctor_soulharvest",
                    "level": 9,
                    "categorySlug": "terror",
                    "tooltipUrl": "skill/witch-doctor/soul-harvest",
                    "description": "Cooldown: 12 seconds\r\n\r\nFeed on the life force of enemies within 18 yards. Gain 3% Intelligence for 30 seconds for each affected enemy. This effect stacks up to 5 times.",
                    "simpleDescription": "Cooldown: 12 seconds\r\n\r\nFeed on the life force of enemies to increase your Intelligence for 30 seconds.",
                    "skillCalcId": "d"
                },
                "rune": {
                    "slug": "soul-harvest-c",
                    "type": "c",
                    "name": "Languish",
                    "level": 32,
                    "description": "Increase your Armor by 10% per harvested enemy and reduce their movement speed by 80% for 5 seconds.",
                    "simpleDescription": "Increase your Armor for each harvested enemy and reduce their movement speed.",
                    "tooltipParams": "rune/soul-harvest/c",
                    "skillCalcId": "b",
                    "order": 2
                }
            }, {
                "skill": {
                    "slug": "summon-zombie-dogs",
                    "name": "Summon Zombie Dogs",
                    "icon": "witchdoctor_summonzombiedog",
                    "level": 4,
                    "categorySlug": "defensive",
                    "tooltipUrl": "skill/witch-doctor/summon-zombie-dogs",
                    "description": "Cooldown: 45 seconds\r\n\r\nSummon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 120% of your weapon damage as Physical per hit.",
                    "simpleDescription": "Cooldown: 45 seconds\r\n\r\nSummon 3 Zombie Dogs to fight by your side.",
                    "skillCalcId": "Y"
                },
                "rune": {
                    "slug": "summon-zombie-dogs-e",
                    "type": "e",
                    "name": "Leeching Beasts",
                    "level": 54,
                    "description": "Your Zombie Dogs heal you for 100% of your Life On Hit with every attack.",
                    "simpleDescription": "Your Zombie Dogs heal you as they attack.",
                    "tooltipParams": "rune/summon-zombie-dogs/e",
                    "skillCalcId": "c",
                    "order": 4
                }
            }, {
                "skill": {
                    "slug": "gargantuan",
                    "name": "Gargantuan",
                    "icon": "witchdoctor_gargantuan",
                    "level": 19,
                    "categorySlug": "voodoo",
                    "tooltipUrl": "skill/witch-doctor/gargantuan",
                    "description": "Cooldown: 60 seconds\r\n\r\nSummon a Gargantuan zombie to fight for you. The Gargantuan attacks for 450% of your weapon damage as Physical.",
                    "simpleDescription": "Cooldown: 60 seconds\r\n\r\nSummon a Gargantuan zombie to fight for you.",
                    "skillCalcId": "T"
                },
                "rune": {
                    "slug": "gargantuan-b",
                    "type": "b",
                    "name": "Humongoid",
                    "level": 22,
                    "description": "The Gargantuan gains the Cleave ability, allowing its attacks to hit multiple enemies for 585% of your weapon damage as Cold.",
                    "simpleDescription": "The Gargantuan gains the Cleave ability, allowing it to attack multiple enemies.",
                    "tooltipParams": "rune/gargantuan/b",
                    "skillCalcId": "a",
                    "order": 0
                }
            }],
            "passive": [{
                "skill": {
                    "slug": "confidence-ritual",
                    "name": "Confidence Ritual",
                    "icon": "x1_witchdoctor_passive_confidenceritual",
                    "level": 60,
                    "tooltipUrl": "skill/witch-doctor/confidence-ritual",
                    "description": "You deal 25% additional damage to enemies within 20 yards.",
                    "flavor": "Take your enemies into your confidence. Bring them close, so that they may share the fruits of your efforts.",
                    "skillCalcId": "S"
                }
            }, {
                "skill": {
                    "slug": "fierce-loyalty",
                    "name": "Fierce Loyalty",
                    "icon": "witchdoctor_passive_fierceloyalty",
                    "level": 45,
                    "tooltipUrl": "skill/witch-doctor/fierce-loyalty",
                    "description": "While you have a Gargantuan, Zombie Dog, or Fetish summoned, your movement speed is increased by 15%.\r\n\r\nThis bonus is increased to 30% while a Gargantuan, Zombie Dog, or Fetish is not in combat.\r\n\r\nAdditionally, you may have 1 additional Zombie Dog summoned at one time.",
                    "flavor": "Establish dominance. They will obey.",
                    "skillCalcId": "g"
                }
            }, {
                "skill": {
                    "slug": "spirit-vessel",
                    "name": "Spirit Vessel",
                    "icon": "witchdoctor_passive_spiritvessel",
                    "level": 30,
                    "tooltipUrl": "skill/witch-doctor/spirit-vessel",
                    "description": "When you receive fatal damage, you automatically enter the spirit realm for 2 seconds and heal to 50% of your maximum Life. \r\n\r\nThis effect may occur once every 60 seconds.",
                    "flavor": "Everyone dies. Sometimes we must return to finish what we started.",
                    "skillCalcId": "e"
                }
            }, {
                "skill": {
                    "slug": "grave-injustice",
                    "name": "Grave Injustice",
                    "icon": "witchdoctor_passive_graveinjustice",
                    "level": 50,
                    "tooltipUrl": "skill/witch-doctor/grave-injustice",
                    "description": "Gain 1% of your maximum Life and Mana and reduce the cooldown of all of your skills by 1 second when an enemy dies within 20 yards.\r\n\r\nThe range is extended by items that increase your gold pickup radius.",
                    "flavor": "Only a fool tries to cheat death. The wise offer a fair trade.",
                    "skillCalcId": "T"
                }
            }]
        },
        "items": {
            "head": {
                "id": "Unique_Helm_Set_16_x1",
                "name": "Helltooth Mask",
                "icon": "unique_helm_set_16_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/CoYBCPKLh9UGEgcIBBU1RUWJHT_yCdgdRXvG3R2bBgDLHSN9oAEdZiMGUB3zcAetMItSOJYDQABQElgEYJYDaikKDAgAELDM_9iBgIDAFhIZCOvBguUPEgcIBBWkvhzCMI9SOABAAZABCIABRqUBI32gAa0B5hXbDbUBf_lOXbgB9KXUpw_AAQEYlevV6w5QBlgCoAGV69XrDqAB1ezl4A6gAdOMuvsFoAGMwIz4AaABqrT0lAY",
                "setItemsEquipped": ["Unique_Boots_Set_16_x1", "Unique_Pants_Set_16_x1", "Unique_Shoulder_Set_16_x1", "Unique_Helm_Set_16_x1", "Unique_Chest_Set_16_x1"]
            },
            "torso": {
                "id": "Unique_Chest_Set_16_x1",
                "name": "Helltooth Tunic",
                "icon": "unique_chest_set_16_x1_witchdoctor_female",
                "displayColor": "green",
                "tooltipParams": "item/CssBCJjb7xkSBwgEFQaQgQ8d08wHYx20T4luHYQDodYdJ_tEIR1zIwZQHdw7U2gwi1o4pAJAAFASWARgpAJqKwoMCAAQi9a1w4iAgIASEhsI5I3PugcSBwgEFfYKX_4wi1I4AEABWASQAQhqKwoMCAAQjNa1w4iAgIASEhsIldfIsg0SBwgEFfYKX_4wi1I4AEABWASQAQhqKwoMCAAQr9O1w4iAgIASEhsIl6aF5AwSBwgEFfYKX_4wi1I4AEABWASQAQiAAUa1ATEiGWAYjMCM-AFQBlgCoAGV69XrDqAB1ezl4A6gAdOMuvsFoAGMwIz4AaABqrT0lAY",
                "setItemsEquipped": ["Unique_Boots_Set_16_x1", "Unique_Pants_Set_16_x1", "Unique_Shoulder_Set_16_x1", "Unique_Helm_Set_16_x1", "Unique_Chest_Set_16_x1"]
            },
            "feet": {
                "id": "Unique_Boots_Set_16_x1",
                "name": "Helltooth Greaves",
                "icon": "unique_boots_set_16_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/ClsI1KD9zA4SBwgEFda8SNAdm4b24h1DTkRRHSCNN1QdHJN7Rh2s05k5HfPVR7Qwi1I4wAJAAFASWARgwAKAAUalARyTe0atAevi5AW1AaBFm3-4AZ24vYEHwAEBGNOMuvsFUAZYAqABlevV6w6gAdXs5eAOoAHTjLr7BaABjMCM-AGgAaq09JQG",
                "setItemsEquipped": ["Unique_Boots_Set_16_x1", "Unique_Pants_Set_16_x1", "Unique_Shoulder_Set_16_x1", "Unique_Helm_Set_16_x1", "Unique_Chest_Set_16_x1"]
            },
            "hands": {
                "id": "Unique_Gloves_003_x1",
                "name": "Tasker and Theo",
                "icon": "unique_gloves_003_x1_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/ClYImfiW_A0SBwgEFcArSiIdHaONxB0QL8oqHZinjsAdfnZVoR3zcAetMItSOJkDQABQElgEYJkDgAFGpQEQL8oqrQF-VrMutQHJW5KkuAGMq4PhAcABBBiAr9GkBFAGWAI"
            },
            "shoulders": {
                "id": "Unique_Shoulder_Set_16_x1",
                "name": "Helltooth Mantle",
                "icon": "unique_shoulder_set_16_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/ClsI2ZDj5wwSBwgEFdVE84kdcYt38B1yjh0hHSCNN1QdWLcblR24vCB6HZuG9uIwi1I44QJAAFASWARg4QKAAUalAVi3G5WtAUNORFG1AdL4yBW4AbqIxaoKwAEBGNXs5eAOUAZYAqABlevV6w6gAdXs5eAOoAHTjLr7BaABjMCM-AGgAaq09JQG",
                "setItemsEquipped": ["Unique_Boots_Set_16_x1", "Unique_Pants_Set_16_x1", "Unique_Shoulder_Set_16_x1", "Unique_Helm_Set_16_x1", "Unique_Chest_Set_16_x1"]
            },
            "legs": {
                "id": "Unique_Pants_Set_16_x1",
                "name": "Helltooth Leg Guards",
                "icon": "unique_pants_set_16_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/CrUBCMGTqr0EEgcIBBUVjU4xHZuG9uIdj5DKUB1XzoHaHUNORFEdcYt38B2svNNTMItSOKECQABQElgEYKECaisKDAgAENW1t_qGgIDgIhIbCKGL0ZwMEgcIBBX2Cl_-MItSOABAAVgEkAEIaisKDAgAEPnL7bOCgIDgAxIbCOjA8rEBEgcIBBX2Cl_-MItSOABAAVgEkAEIgAFGpQFXzoHarQE4neQEtQGfktWluAHhoNyJC8ABCxiqtPSUBlAGWAKgAZXr1esOoAHV7OXgDqAB04y6-wWgAYzAjPgBoAGqtPSUBg",
                "setItemsEquipped": ["Unique_Boots_Set_16_x1", "Unique_Pants_Set_16_x1", "Unique_Shoulder_Set_16_x1", "Unique_Helm_Set_16_x1", "Unique_Chest_Set_16_x1"]
            },
            "bracers": {
                "id": "P4_Unique_Bracer_102",
                "name": "Lakumba’s Ornament",
                "icon": "p4_unique_bracer_102_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/CkAIlbuD8goSBwgEFVoarNAdZTrU4B1DTkRRHTsnbyQd5hXbDR2bhvbiMItSON0CQABQElgEYN0CgAFGtQHbLMrLGMuWn_UFUAZYAg"
            },
            "mainHand": {
                "id": "Unique_Dagger_003_x1",
                "name": "The Barber",
                "icon": "unique_dagger_003_x1_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/CogBCPSJ8o0KEgcIBBU6DPLFHVSlvI0dnAYAyx2yJLFUHXujJiId9HAHrR2eT4PcMItaOJADQABQElgEYJADaisKDAgAEPj14dWBgICgDhIbCIaaxO4CEgcIBBVCLTepMI9SOABAAVgEkAEIgAFGpQF7oyYirQFmIwZQtQG-gk-yuAGMsPGqD8ABBhiLz--gB1AGWAI"
            },
            "offHand": {
                "id": "P2_mojo_norm_unique_02",
                "name": "Henri’s Perquisition",
                "icon": "p2_mojo_norm_unique_02_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/CoMBCIODzZcIEgcIBBWIgkJUHfNwB60dflazLh16nfaiHZsGAMsdrNOZOTCLUjiLAkAAUBJYBGCLAmorCgwIABDNxLXDiICAgBISGwiB-bPiChIHCAQV9gpf_jCPUjgAQAFYBJABCIABRqUBep32oq0BZiMGULUBLGHY97gB1rTV3AfAAQkYkIqUxApQBlgC"
            },
            "waist": {
                "id": "Unique_Belt_009_x1",
                "name": "The Witching Hour",
                "icon": "unique_belt_009_x1_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/CloI_euxPRIHCAQVHd2PaR2Yp47AHX52VaEd3DtTaB2EA6HWHRtdz0QdbhfHezCLWji9AkAAUBJYBGC9AoABRqUBmKeOwK0BmKeOwLUBwKdC1LgBgoLEhAzAAQUYuvT-mA1QBlgC"
            },
            "rightFinger": {
                "id": "P2_Unique_Ring_02",
                "name": "The Short Man's Finger",
                "icon": "p2_unique_ring_02_demonhunter_male",
                "displayColor": "orange",
                "tooltipParams": "item/CogBCOft-tQJEgcIBBVo-dsYHR2jjcQd5hXbDR1DTkRRHZinjsAdm4b24jCLUjinAkAAUBJYBGCnAmowCgwIABDx9e2zgoCA4AMSIAiRqrn4AxIHCAQVr0i2wTCLUjgAQABQElgEkAEI2AFwgAFGpQGYp47ArQFmIwZQtQE2VV1EuAGchO2kAcABBRjQ5d-NA1AGWAI"
            },
            "leftFinger": {
                "id": "Unique_Ring_013_x1",
                "name": "The Compass Rose",
                "icon": "unique_ring_013_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/Co0BCM-r0pcEEgcIBBWBVjW5HR2jjcQdmKeOwB3mFdsNHXRFp4kd6-LkBR2bhvbiMItSONcCQABQElgEYNcCajAKDAgAEN2-3vOBgICgPhIgCO2RwqgJEgcIBBWn5bHBMItSOABAAFASWASQAQjYAXqAAUalAXRFp4mtAWYjBlC1ATZVXUS4AcOAkPANwAEHGP2l1ewIUAZYAqAB_aXV7AigAbrc07AL",
                "setItemsEquipped": ["Unique_Ring_013_x1", "Unique_Amulet_008_x1"]
            },
            "neck": {
                "id": "Unique_Amulet_008_x1",
                "name": "The Traveler's Pledge",
                "icon": "unique_amulet_008_x1_demonhunter_male",
                "displayColor": "green",
                "tooltipParams": "item/CowBCO2_9woSBwgEFR13Clsd9HAHrR2wwQlyHRAvyiodv7liKB3MVmJGHQQGPrUwi1o49QJAAFASWARg9QJqMAoMCAAQjdLts4KAgOADEiAI-eyCngYSBwgEFejloMEwi1I4AEAAUBJYBJABCNgBcIABRqUBEC_KKq0BZiMGULUBsMVEZLgBlMPxrwLAAQsYutzTsAtQBlgCoAH9pdXsCKAButzTsAs",
                "setItemsEquipped": ["Unique_Ring_013_x1", "Unique_Amulet_008_x1"]
            }
        },
        "followers": {
            "templar": {
                "slug": "templar",
                "level": 70,
                "items": {
                    "special": {
                        "id": "x1_FollowerItem_Templar_Legendary_01",
                        "name": "Enchanting Favor",
                        "icon": "x1_followeritem_templar_legendary_01_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkAIxeL1kA4SBwgEFY9EW9IdOLLA1R2bBgDLHWpJaeodsMEJch2BgcbEMItSOM0CQABQElgEYM0CgAFGtQHsC2NEGOHtpdoF"
                    },
                    "mainHand": {
                        "id": "Unique_Sword_1H_014_x1",
                        "name": "Doombringer",
                        "icon": "unique_sword_1h_014_x1_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkAIre-1yQ8SBwgEFVlMOU4dzFZiRh2cBgDLHYwcvpYd9HAHrR2EJzvIMItaOLUCQABQElgEYLUCgAFGtQGb2dnvGLKxyuMJ"
                    },
                    "offHand": {
                        "id": "Unique_Shield_009_x1",
                        "name": "Stormshield",
                        "icon": "unique_shield_009_x1_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkUImO2sywwSBwgEFa8toAkdS7X5Sx2cBgDLHU0_GPYd3oL85R17LaZuHfRwB60wi1o4lAJAAFASWARglAKAAUa1ARMMO2wY3raBmgE"
                    },
                    "rightFinger": {
                        "id": "Unique_Ring_001_x1",
                        "name": "Band of Hollow Whispers",
                        "icon": "unique_ring_001_x1_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkAI0azv0QkSBwgEFT4lIrkd0IZp1x2EA6HWHbi8IHodbcQFEh3cO1NoMItaOOECQABQElgEYOECgAFGtQE2VV1EGIPr7u0I"
                    },
                    "leftFinger": {
                        "id": "Unique_Ring_021_x1",
                        "name": "Manald Heal",
                        "icon": "unique_ring_021_x1_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkUI9uuxrQ0SBwgEFUBWRrkdco4dIR2L8XpCHUNORFEdEC_KKh3FdKFGHZuG9uIwi1I4ggJAAFASWARgggKAAUa1ATZVXUQY_6bN6wg"
                    },
                    "neck": {
                        "id": "Unique_Amulet_004_x1",
                        "name": "Xephirian Amulet",
                        "icon": "unique_amulet_004_x1_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/CkAIy6iJswISBwgEFZlFCFsdS7X5Sx1F4E0iHd6C_OUdfnZVoR3K-rygMItaOOMCQABQElgEYOMCgAFGtQGwxURkGLKWwrAL"
                    }
                },
                "stats": {
                    "goldFind": 0,
                    "magicFind": 0,
                    "experienceBonus": 33
                },
                "skills": [{
                    "skill": {
                        "slug": "intervene",
                        "name": "Intervene",
                        "icon": "templar_intervene",
                        "level": 5,
                        "tooltipUrl": "skill/templar/intervene",
                        "description": "Cooldown: 10 seconds\r\n\r\nTaunt enemies within 10 yards of you for 3 seconds when you are hit.",
                        "simpleDescription": "Cooldown: 10 seconds\r\n\r\nTaunt enemies near you when you are hit.",
                        "skillCalcId": "Z"
                    }
                }, {
                    "skill": {
                        "slug": "loyalty",
                        "name": "Loyalty",
                        "icon": "templar_loyalty",
                        "level": 10,
                        "tooltipUrl": "skill/templar/loyalty",
                        "description": "Regenerates 6437 Life per second for you and the Templar.",
                        "simpleDescription": "Provides Life regeneration for you and the Templar.",
                        "skillCalcId": "b"
                    }
                }, {
                    "skill": {
                        "slug": "charge",
                        "name": "Charge",
                        "icon": "templar_shieldcharge",
                        "level": 15,
                        "tooltipUrl": "skill/templar/charge",
                        "description": "Cooldown: 10 seconds\r\n\r\nCharges a target, dealing 280% weapon damage and stunning all enemies within 8 yards for 3 seconds.",
                        "simpleDescription": "Cooldown: 10 seconds\r\n\r\nCharges an enemy, dealing damage and stunning nearby enemies.",
                        "skillCalcId": "c"
                    }
                }, {
                    "skill": {
                        "slug": "guardian",
                        "name": "Guardian",
                        "icon": "templar_guardian",
                        "level": 20,
                        "tooltipUrl": "skill/templar/guardian",
                        "description": "Cooldown: 30 seconds\r\n\r\nRush to your aid, knocking back enemies within 15 yards and healing you for 182383 Life.",
                        "simpleDescription": "Cooldown: 30 seconds\r\n\r\nWhen your Life is low, the Templar will come to your aid, knocking back nearby enemies and healing you.",
                        "skillCalcId": "W"
                    }
                }]
            },
            "scoundrel": {
                "slug": "scoundrel",
                "level": 70,
                "items": {
                    "special": {
                        "id": "x1_FollowerItem_Scoundrel_Legendary_01",
                        "name": "Skeleton Key",
                        "icon": "x1_followeritem_scoundrel_legendary_01_demonhunter_male",
                        "displayColor": "orange",
                        "tooltipParams": "item/ClgI7JGpvwkSBwgEFYmhVzodco4dIR1qSWnqHTsnbyQdmwYAyx3J-rygMIlSOMADQABQElgGYMADgAFGtQGmAUzyyAGVsPEDyAHr0LUYyAGzv9YEyAHOlIQEGJKGvaUH"
                    },
                    "mainHand": {
                        "id": "Bow_001",
                        "name": "Short Bow",
                        "icon": "bow_001_demonhunter_male",
                        "displayColor": "white",
                        "tooltipParams": "item/ChoI0IiKkA8SBwgEFTguVoMwiVI42ANAAGDYAxiPx87KDw"
                    }
                },
                "stats": {
                    "goldFind": 0,
                    "magicFind": 0,
                    "experienceBonus": 36
                },
                "skills": [{
                    "skill": {
                        "slug": "poison-bolts",
                        "name": "Poison Bolts",
                        "icon": "scoundrel_poisonarrow",
                        "level": 5,
                        "tooltipUrl": "skill/scoundrel/poison-bolts",
                        "description": "Cooldown: 3 seconds\r\n\r\nRanged attack that deals 320% weapon damage and an additional 100% weapon damage as Poison over 3 seconds.",
                        "simpleDescription": "Cooldown: 3 seconds\r\n\r\nShoots a deadly poisoned bolt.",
                        "skillCalcId": "Z"
                    }
                }, {
                    "skill": {
                        "slug": "dirty-fighting",
                        "name": "Dirty Fighting",
                        "icon": "scoundrel_dirtyfighting",
                        "level": 10,
                        "tooltipUrl": "skill/scoundrel/dirty-fighting",
                        "description": "Cooldown: 6 seconds\r\n\r\nBlinds nearby enemies in front of the Scoundrel for 2 seconds.",
                        "simpleDescription": "Cooldown: 6 seconds\r\n\r\nBlinds nearby enemies in front of the Scoundrel.",
                        "skillCalcId": "b"
                    }
                }, {
                    "skill": {
                        "slug": "multishot",
                        "name": "Multishot",
                        "icon": "x1_scoundrel_multishot",
                        "level": 15,
                        "tooltipUrl": "skill/scoundrel/multishot",
                        "description": "Cooldown: 8 seconds\r\n\r\nActive: The Scoundrel will shoot 3 bolts, each dealing 110% weapon damage.\r\n\r\nPassive: The Scoundrel's special attacks have a 50% chance to fire 3 bolts.",
                        "simpleDescription": "Cooldown: 8 seconds\r\n\r\nActive: The Scoundrel will shoot multiple bolts at once.\r\n\r\nPassive: The Scoundrel's special attacks have a chance to fire multiple bolts.",
                        "skillCalcId": "X"
                    }
                }, {
                    "skill": {
                        "slug": "anatomy",
                        "name": "Anatomy",
                        "icon": "scoundrel_anatomy",
                        "level": 20,
                        "tooltipUrl": "skill/scoundrel/anatomy",
                        "description": "Increases Critical Hit Chance by 1.8% for you and the Scoundrel.",
                        "simpleDescription": "Increases Critical Hit Chance for you and the Scoundrel.",
                        "skillCalcId": "W"
                    }
                }]
            },
            "enchantress": {
                "slug": "enchantress",
                "level": 70,
                "items": {
                    "mainHand": {
                        "id": "Dagger_001",
                        "name": "Simple Dagger",
                        "icon": "dagger_001_demonhunter_male",
                        "displayColor": "white",
                        "tooltipParams": "item/ChoI0rTA9gQSBwgEFfp1T7IwiVI47gRAAGDuBBiLqITbCQ"
                    }
                },
                "stats": {
                    "goldFind": 0,
                    "magicFind": 0,
                    "experienceBonus": 0
                },
                "skills": [{}, {}, {}, {}]
            }
        },
        "legendaryPowers": [{
            "id": "Unique_Mace_2H_103_x1",
            "name": "The Furnace",
            "icon": "unique_mace_2h_103_x1_demonhunter_male",
            "displayColor": "orange",
            "tooltipParams": "item/the-furnace"
        }, {
            "id": "Unique_VoodooMask_102_x1",
            "name": "Mask of Jeram",
            "icon": "unique_voodoomask_102_x1_demonhunter_male",
            "displayColor": "orange",
            "tooltipParams": "item/mask-of-jeram"
        }, {
            "id": "P3_Unique_Ring_107",
            "name": "Ring of Royal Grandeur",
            "icon": "p3_unique_ring_107_demonhunter_male",
            "displayColor": "orange",
            "tooltipParams": "item/ring-of-royal-grandeur-3EbhYb"
        }],
        "stats": {
            "life": 695233,
            "damage": 1150100.0,
            "toughness": 1.46114E7,
            "healing": 339632.0,
            "attackSpeed": 1.5,
            "armor": 6165,
            "strength": 77,
            "dexterity": 77,
            "vitality": 6104,
            "intelligence": 10020,
            "physicalResist": 1072,
            "fireResist": 1072,
            "coldResist": 1735,
            "lightningResist": 1072,
            "poisonResist": 1424,
            "arcaneResist": 1215,
            "critDamage": 4.92,
            "blockChance": 0.0,
            "blockAmountMin": 0,
            "blockAmountMax": 0,
            "damageIncrease": 0.0,
            "critChance": 0.43500000074999995,
            "damageReduction": 0.0,
            "thorns": 2401.0,
            "lifeSteal": 0.0,
            "lifePerKill": 17909.0,
            "goldFind": 0.32000000000000006,
            "magicFind": 0.0,
            "lifeOnHit": 0.0,
            "primaryResource": 750,
            "secondaryResource": 0
        },
        "progression": {
            "act1": {
                "completed": false,
                "completedQuests": []
            },
            "act2": {
                "completed": false,
                "completedQuests": []
            },
            "act3": {
                "completed": false,
                "completedQuests": []
            },
            "act4": {
                "completed": false,
                "completedQuests": []
            },
            "act5": {
                "completed": false,
                "completedQuests": []
            }
        },
        "dead": false,
        "last-updated": 1478482329
    }
    */
});