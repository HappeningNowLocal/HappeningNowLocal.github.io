# Happening Now Local: Source List

Checked 2026-10-27. **Reachable** means the page loaded from this box. **Search-only** means I read the page text through the search index and did not load it directly. **Blocked** means 403 or a block page.

## Cross-region (all cities)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| NPS Fee-Free Days | https://www.nps.gov/planyourvisit/fee-free-parks.htm | 2026 NPS free days (Nov 11 Veterans Day; U.S. residents only) | Search-only |
| Recreation.gov fee-free days | https://www.recreation.gov/articles/location-spotlight/visit-your-public-lands-on-these-fee-free-days/1166 | NPS/BLM/USFS/FWS/USACE free days for 2026 | Search-only |
| NPS Events API | https://developer.nps.gov/api/v1/events?parkCode=XXXX&api_key=DEMO_KEY | Ranger programs for every park (lake, zion, brca, cebr, jotr, sagu, cabr, samo, deva, grba…) | Reachable. Park calendar.htm pages are JS-only, so use the API |
| NPS event detail page | https://www.nps.gov/planyourvisit/event-details.htm?id=EVENT_ID | Per-event link used as the source | Built from API ids |

## Henderson, NV
| Name | URL | Covers | Reachable |
|---|---|---|---|
| City/gov | https://www.cityofhenderson.com/ (events, farmers market, garage sales, Water Street Plaza page) | City events, Water Street District | **Blocked (403) from this box** for some pages; earlier pass used whatever loaded |
| Water Street District | https://www.cityofhenderson.com/government/departments/parks-and-recreation/facilities/other-venues/water-street-plaza/-toggle-all-1287 | Water Street Plaza events | **Blocked** |
| Lake Mead NRA | https://www.nps.gov/lake/planyourvisit/calendar.htm | Ranger and volunteer events | Page empty (JS); API works |

## Las Vegas, NV (incl. North Las Vegas)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Clark County news | https://www.clarkcountynv.gov/news/102126-day-of-the-dead | County parks events | Search-only |
| Red Rock Canyon NCA (BLM) | https://www.redrockcanyonlv.org/events/ | Free BLM ranger hikes, Junior Rangers (TimeTap registration) | Search-only |
| Spring Mountains NRA / Mt Charleston (USFS) | https://www.gomtcharleston.com/programs/ | Night hikes, Junior Ranger, snowshoe hikes | Search-only; no Nov–Dec dates found |
| Nevada State Parks | https://parks.nv.gov/events | Valley of Fire, Spring Mountain Ranch, Cathedral Gorge, Big Bend | Reachable. List page shows only the next ~5 events; individual /events/... pages found via search |
| Las Vegas Sun | https://lasvegassun.com/news/2026/aug/21/neon-city-festival-announces-star-studded-lineup-f/ | Local news event stories | Search-only |
| LasVegasHowTo (aggregator) | https://www.lasvegashowto.com/las-vegas-events-november | Parades, conventions (lower confidence) | Search-only |
| FestivalNet | https://festivalnet.com/96995/Las-Vegas-Nevada/Festivals/Gingerbread-Craft-Boutique | Craft fairs | Search-only |
| LV Craft Shows | https://www.lvcraftfestival.com/ | Holiday Craft & Gift Festival | Search-only |
| Crossroads gun shows | https://www.crossroadsgunshows.com/ | Gun shows (LV, Phoenix, Utah) | Reachable |
| TV news: KTNV 13 | https://www.ktnv.com/ | Community calendar / event stories | No usable event calendar found in this pass |
| TV news: FOX5 KVVU | https://www.fox5vegas.com/ | Event stories | Same as KTNV |
| TV news: KSNV News 3 | https://news3lv.com/ | Event stories | Same as KTNV |
| TV news: KLAS 8NewsNow | https://www.8newsnow.com/ | Event stories | Same as KTNV |
| Las Vegas Astronomical Society (via NV State Parks, NPS Death Valley) | https://parks.nv.gov/events/star-gazing-with-the-las-vegas-astronomical-society-2 | Star parties | Search-only |

## Boulder City, NV (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Lake Mead NRA via NPS API | see cross-region | Leave No Trace Spotlight (Oct 29–31), volunteer days, Christmas Bird Count | Reachable (API) |

## St. George, UT
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Utah State Parks events API | https://stateparks.utah.gov/wp-json/tribe/events/v1/events?start_date=2026-10-27&end_date=2026-12-31&per_page=50 | Snow Canyon, Sand Hollow, Quail Creek, Antelope Island, Goblin Valley, Frontier Homestead, Camp Floyd | Reachable. The HTML calendar page shows little |
| Sand Hollow calendar | https://stateparks.utah.gov/parks/sand-hollow/events-calendar/ | Tournaments, closures | Search-only |
| Zion NP | https://www.nps.gov/zion/planyourvisit/calendar.htm | Ranger stargazing | JS-only; API works |
| St. George Chamber (Tabernacle) | https://stgeorgechamber.com/november-2026-tabernacle-events/ | Free Tabernacle programs | Search-only |
| SGWOM | https://sgwom.com/news/things-to-do-st-george-november-2026/ | Local event guide | Search-only |
| STG Newsletter | https://stgnewsletter.com/events/kickoff-to-christmas-st-george-2026 | City events | Search-only |
| NowPlayingUtah | https://nowplayingutah.com/ | Utah Cultural Alliance arts/events calendar | Search-only |
| Washington County Water (Red Hills Desert Garden) | https://www.wcwcd.gov/event/ | Holiday lights | Not fetched |
| St George News / KSL / KUTV | https://www.stgeorgeutah.com/ , https://www.ksl.com/events , https://kutv.com/ | News / community calendars | KSL event pages reachable; others not checked in depth |

## Cedar City, UT
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Frontier Homestead State Park | https://stateparks.utah.gov/event/storytime-tuesday-17/ | Weekly storytime | Search-only + API |
| Bryce Canyon NP | NPS API (brca) | Full moon hikes, fee-free day | Reachable (API) |
| Cedar Breaks NM | NPS API (cebr) | No events listed Oct–Dec | Reachable (API) |

## Phoenix, AZ (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| City of Phoenix calendar | https://www.phoenix.gov/calendar | City events, S'edav Va'aki Museum, library | Search-only |
| APS Electric Light Parade | https://www.phoenix.gov/administration/departments/parks/classes-programs/featured-events/aps-electric-light-parade.html | Parade | Reachable |
| Downtown Phoenix Inc. | https://dtphx.org/ | First Friday, markets, PJs in the Park | Reachable |
| The Square PHX | https://thesquarephx.org/ | Faire @ The Square | Search-only |
| Tempe Festival of the Arts | https://tempefestivalofthearts.com/ | Art fair | Reachable |
| Visit Arizona events | https://www.visitarizona.com/events/ | Glendale Glitters etc. | Reachable |
| Arizona State Parks | https://azstateparks.com/events , https://azstateparks.com/lost-dutchman/events | Star parties, guided hikes | Reachable |
| Maricopa County Parks | https://www.maricopacountyparks.net/events/ | Night hikes (McDowell Mtn "Stars and Spines" Nov 23) | Search-only; not added |
| Phoenix Public Library | https://calendar.phoenixpubliclibrary.org/ | Library programs | Search-only; not added |
| Saguaro NP (Tucson) | NPS API (sagu) | Star party Nov 27, night hikes, Sun Party Dec 20 | Reachable. Tucson isn't a covered city, so these weren't added |

## Salt Lake City, UT (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Utah State Parks API | see above | Antelope Island, Camp Floyd | Reachable |
| Salt Lake County calendar (Clark Planetarium) | https://slco.trumba.com/ | Free planetarium programs | Reachable |
| Tracy Aviary | https://tracyaviary.org/liberty-park/events/ | Bird demos, plant walks | Reachable |
| SL JCC | https://www.slcjcc.org/pages/events-hanukkah-market/ | Hanukkah Market | Search-only |
| South Salt Lake Arts | https://sslarts.org/programs/events/holiday-market | City arts events | Search-only |
| KSL Events | https://www.ksl.com/events/ | TV station community calendar | Reachable |
| Haps (aggregator) | https://thehaps.app/ | Winter Farmers Market | Search-only (lower confidence; check the Downtown Alliance site) |
| Salt Lake County Library | https://slcls.libnet.info/ | Library events | Search-only; not added |

## San Diego, CA (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| City of San Diego | https://www.sandiego.gov/december-nights | December Nights | Search-only |
| San Diego Tourism Authority | https://www.sandiego.org/plan-your-trip/plan-by-season/holidays/free-holiday-activities | Free holiday events list | Search-only (start times not listed) |
| La Jolla Parade | https://www.ljparade.com/ | Parade | Search-only |
| SD Bay Parade of Lights | https://sdparadeoflights.org/ | Boat parade | Search-only |
| Cabrillo NM | NPS API (cabr) | Bunker tours, lighthouse open tower, bird walks | Reachable (API) |
| Balboa Park | https://balboapark.org/event/ | Tianguis, Art Mart | Search-only; not verified, not added |

## Los Angeles, CA (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Griffith Observatory | https://griffithobservatory.lacity.gov/ | Star parties, Sunset Walk & Talk | Reachable |
| LA Public Library | https://www.lapl.org/events | Library programs | Search-only |
| LA County Beaches & Harbors | https://beaches.lacounty.gov/holidayboatparade/ | Marina del Rey boat parade | Search-only |
| Music Center press room | https://pressroom.musiccenter.org/ | LA County Holiday Celebration | Search-only |
| Hollywood Christmas Parade | https://thehollywoodchristmasparade.org/ | Parade | Reachable |
| Autry Museum | http://theautry.org/events/ | Pow Wow | Search-only |
| Fun With Kids in LA (aggregator) | https://www.funwithkidsinla.com/post/free-christmas-events-los-angeles-2026 | Free holiday parades and lightings | Reachable (says it's checked against organizer sites; secondary source) |
| Santa Monica Mountains NRA | NPS API (samo) | No events listed | Reachable (API) |
| California State Parks | https://www.parks.ca.gov/ | Events | Not checked this pass |

## Not started (Denver, Albuquerque, Reno, Mesquite)
Candidate official sources: Colorado Parks & Wildlife (https://cpw.state.co.us/events), New Mexico State Parks (https://www.emnrd.nm.gov/spd/), Nevada State Parks (above), City of Reno (https://www.reno.gov/), City of Mesquite (https://www.mesquitenv.gov/).
