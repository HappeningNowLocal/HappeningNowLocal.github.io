# Happening Now Local: Source List

Checked 2026-11-10. **Reachable** means the page loaded from this box. **Search-only** means I read the page text through the search index and did not load it directly. **Blocked** means 403 or a block page.

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
| Eventbrite | https://www.eventbrite.com/d/nv--henderson/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| City/gov | https://www.cityofhenderson.com/ (events, farmers market, garage sales, Water Street Plaza page) | City events, Water Street District | **Blocked (403) from this box** for some pages; earlier pass used whatever loaded |
| Water Street District | https://www.cityofhenderson.com/government/departments/parks-and-recreation/facilities/other-venues/water-street-plaza/-toggle-all-1287 | Water Street Plaza events | **Blocked** |
| Workarounds that work (Henderson) | Web search snippets of cityofhenderson.com event pages (e.g. /residents/special-interest/winterfest, /f1-watch-party/, /indigenous-american-heritage-celebration); FOX5 (fox5vegas.com) Henderson stories; create.vegas; Eventeny (eventeny.com, City of Henderson host); Vegas Events and More (vegaseventsandmore.ourhoasite.com, Shop Small Henderson); Discover Henderson LinkedIn posts; City Parks & Rec WebTrac catalog (nvhendersonweb.myvscloud.com) for classes | Use these to confirm Water Street Plaza & city events when the city site 403s. waterstreetdistrict.com loads but has no dated calendar | Reachable |
| Henderson Libraries (LibNet) | https://henderson.libnet.info/events (JSON: https://henderson.libnet.info/eeventcaldata?event_type=0&req={"private":false,"date":"YYYY-MM-DD","days":60}) | Library events; use https://henderson.libnet.info/event/ID as the source | Reachable (hendersonlibraries.com itself is blocked) |
| Lake Mead NRA | https://www.nps.gov/lake/planyourvisit/calendar.htm | Ranger and volunteer events | Page empty (JS); API works |

## Las Vegas, NV (incl. North Las Vegas)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/nv--las-vegas/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Tivoli Village | https://tivolivillagelv.com/events/ (event pages are JS-rendered; dates need a headless browser) | Night Market, Nutcracker Night Market (Thursdays in Dec), craft festivals, tree lighting | Reachable |
| LVCC calendar (LVCVA) | https://www.lvcva.com/ (convention calendar; site often blocks bots, cross-check with show sites + https://vegasconventioncalendar.com/venues/las-vegas-convention-center/) | Conventions, trade & consumer shows at LVCC | Partial |
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
| Eventbrite | https://www.eventbrite.com/d/nv--boulder-city/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Lake Mead NRA via NPS API | see cross-region | Leave No Trace Spotlight (Oct 29–31), volunteer days, Christmas Bird Count | Reachable (API) |

## St. George, UT
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/ut--st-george/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Utah State Parks events API | https://stateparks.utah.gov/wp-json/tribe/events/v1/events?start_date=2026-11-04&end_date=2026-12-31&per_page=50 | Snow Canyon, Sand Hollow, Quail Creek, Antelope Island, Goblin Valley, Frontier Homestead, Camp Floyd | Reachable. The HTML calendar page shows little |
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
| Eventbrite | https://www.eventbrite.com/d/ut--cedar-city/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Frontier Homestead State Park | https://stateparks.utah.gov/event/storytime-tuesday-17/ | Weekly storytime | Search-only + API |
| Bryce Canyon NP | NPS API (brca) | Full moon hikes, fee-free day | Reachable (API) |
| Cedar Breaks NM | NPS API (cebr) | No events listed Oct–Dec | Reachable (API) |

## Phoenix, AZ (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/az--phoenix/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
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
| Eventbrite | https://www.eventbrite.com/d/ut--salt-lake-city/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
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
| Eventbrite | https://www.eventbrite.com/d/ca--san-diego/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| City of San Diego | https://www.sandiego.gov/december-nights | December Nights | Search-only |
| San Diego Tourism Authority | https://www.sandiego.org/plan-your-trip/plan-by-season/holidays/free-holiday-activities | Free holiday events list | Search-only (start times not listed) |
| La Jolla Parade | https://www.ljparade.com/ | Parade | Search-only |
| SD Bay Parade of Lights | https://sdparadeoflights.org/ | Boat parade | Search-only |
| Cabrillo NM | NPS API (cabr) | Bunker tours, lighthouse open tower, bird walks | Reachable (API) |
| Balboa Park | https://balboapark.org/event/ | Tianguis, Art Mart | Search-only; not verified, not added |

## Los Angeles, CA (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/ca--los-angeles/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
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

## Laughlin, NV (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/nv--laughlin/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Nevada State Parks: Big Bend of the Colorado | https://parks.nv.gov/events | Ranger hikes at Big Bend SRA | Reachable |
| Lake Mead NRA | NPS API (lake) | Willow Beach and volunteer events | Reachable (API) |
| Las Vegas-Clark County Library District (Laughlin Library) | https://events.thelibrarydistrict.org/ (JSON: /eeventcaldata, same format as Henderson LibNet) | Library crafts, kids' events, free concerts, book sales | Reachable via JSON; use https://events.thelibrarydistrict.org/event/ID as the source |
| Bullhead City events (Locable, city-run) | https://www.bullheadcity.com/ | Boat parade, Light the Belle, Boom Box Parade, river events | Reachable |
| Laughlin Chamber of Commerce | https://laughlinchamber.com/ | Annual events, Holly Jolly Bazaar | Reachable (event pages have inconsistent times) |

## Zion / Springdale, UT (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/ut--springdale/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Zion NP | NPS API (zion) | Ranger talks, stargazing | Reachable (API) |
| Town of Springdale | https://www.springdale.utah.gov/ | Butch Cassidy 10K/5K, Joy to the World | Reachable (Joy to the World page still shows 2025 dates on Nov 10; use the SGWOM 2026 event pages instead) |
| Zion Forever Project | https://www.zionpark.org/pages/artinvitational | Art Invitational | Search-only |
| Duck Creek Village Inn Zion events | https://www.duckcreekvillageinn.com/zion-area-events | Zion corridor roundup (La Verkin Winterfest etc.) | Search-only (secondary) |

## Hurricane, UT (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/ut--hurricane/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Utah State Parks events API | https://stateparks.utah.gov/wp-json/tribe/events/v1/events/ | Sand Hollow and Quail Creek ranger programs | Reachable |
| Hurricane Recreation | https://www.hurricanerecreation.com/ | Christmas Tree Festival, city events | Search-only |
| City of Hurricane | https://www.cityofhurricane.com/ | City events (Peach Days in Sept) | Search-only |
| Legacy Park | https://thelegacypark.com/events/ | Fairgrounds shows and markets | Search-only |
| SGWOM | https://sgwom.com/ | Regional roundup (tree lighting) | Search-only (secondary) |
| The Farm Zion | https://thefarmzion.com/ | Christmas on The Farm | Search-only |

## Kingman, AZ (proposed)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Eventbrite | https://www.eventbrite.com/d/az--kingman/events/ (also /free--events/, /community--events/, /family-and-education--events/, /holiday--events/, /food-and-drink--events/, /arts--events/) | Community events listed on Eventbrite. Open each event page and use its URL as the source. Skip concerts, club/bar crawls, seminars, church-ward internal events, online and generic promos | Reachable |
| Explore Kingman (city tourism) | https://www.explorekingman.com/events/ | Parades, tree lighting, Chillin' on Beale, Cookie Crawl | Reachable (JS-heavy; event pages load) |
| Visit Kingman | https://visitkingman.com/events | Signature events (Route 66 UltraRun) | Search-only |
| Kingman Downtown Merchants Association | https://www.kingmandowntownmerchantsassociation.com/ | Street of Lights, Mingle Jingle | Search-only |
| Kingman Area Chamber | https://www.kingmanchamber.com/ | First Fridays, Cookie Crawl | Search-only |
| Hualapai Mountain Park (Mohave County) | https://runsignup.com/Race/AZ/Kingman/HMPGobblewobble | Park races; check county parks for ranger hikes | Search-only |


## Added or reconfirmed 2026-11-04
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Phoestivus | https://www.phoestivus.com/ | Downtown Phoenix holiday market (Dec Fridays) | Reachable |
| Queer Holiday Market (GPECC) | https://www.equalitychamber.org/queer-holiday-market | Free LGBTQ+/allied makers market | Reachable |
| Jubilee of Trees (Intermountain) | https://intermountainhealthcare.org/give/fundraising-events/jubilee-of-trees | St. George Dixie Convention Center holiday trees | Reachable |
| Utah Tech Tree Lighting | https://utahtech.edu/treelighting/ | Free campus tree lighting | Reachable |
| La Verkin Winterfest | https://laverkinwinterfest.com/ | Holiday festival Dec 4–5 | Reachable (schedule pages sparse) |
| Mecum Las Vegas | https://www.mecum.com/auctions/las-vegas-2026/ | Collector car auction at LVCC | Reachable |
| SnowJam Las Vegas | https://snowjamshow.com/expo/las-vegas/ | Public ski/snowboard expo at LVCC | Reachable |

## Tagging convention / trade shows (`convention` and `industry` fields)
Every event held in a convention center or expo hall (Las Vegas Convention Center, Dixie Convention Center, World Market Center, Mandalay Bay / Venetian expo halls, Phoenix Convention Center, LA / San Diego / Salt Palace convention centers, etc.) must have `"convention": true`. This includes gun shows, craft fairs or home shows *when* held in a convention hall; do not tag them when held at fairgrounds, parks, speedways or hotels' regular ballrooms. Outdoor events in a convention center parking lot are not tagged.
Add `"industry": true` as well when the show is closed to the public (trade/registration only, e.g. CES, SEMA trade days). Industry-only shows never appear in the main list; they show only on the calendar.
The site hides `convention` events by default; visitors opt in with the "Show convention shows" switch.

## Map coordinates (`lat` / `lng` fields), required for every new event

Every event needs `lat` and `lng` (5 decimals) so it shows on the Map view. Each city file also has `center: [lat, lng]`.
1. Geocode the venue once with OpenStreetMap Nominatim (`https://nominatim.openstreetmap.org/search?q=<street address or venue>, <City, ST>&format=json&limit=1&countrycodes=us`). Send a User-Agent of `HappeningNowLocal/1.0 (happeningnowlocal@gmail.com)` and wait at least 1 second between requests.
2. Try the street address first, then the full `place` string, then just the venue name.
3. Accept the result only if it is within about 80 km of the city center. Reuse the coordinates of an existing event at the same venue when there is one.
4. If no exact venue is found (multiple sites, "various locations", TBA), **leave `lat`/`lng` off**. The app keeps those events in the list and calendar and notes "N without an exact location not shown" on the map. Never use the city center as a fake pin.
5. Helper script: `/workspace/hnl-geo/geo.py`, with lookups cached in `cache.json`. It **only fills in events that have no `lat`/`lng`**. It never changes or removes existing coordinates (including ones set by hand), and it only rewrites a city file when it added something. Run it after adding events, then check that any `ADDED` pins look right. Fix bad or missing ones by hand in the JSON; the script will leave them alone.

## Food & BBQ event sources (added 2026-11-07)
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Nevada BBQ Association calendar | https://www.nvbbq.org/ | NV BBQ festivals and cook-offs (Las Vegas BBQ Festival) | Reachable |
| BBQ Jackpot | https://bbqjackpot.com/ | Largest KCBS contest in the West, Silverton, Nov | Reachable |
| Saucy Rossy KCBS by state | https://saucyrossybbq.com/kcbs/regions/NV (also AZ, UT) | Upcoming KCBS contests per state | Reachable |
| Barbecue Championship Series | https://barbequechampionshipseries.org/events/list/ | AZ BBQ comps (Mesa etc.) | Reachable |
| Festival Guides & Reviews (NV) | https://festivalguidesandreviews.com/nevada-festivals/ | Week-by-week NV festival list, incl. food fests | Reachable |
| Vegas PBS community events | https://www.vegaspbs.org/blogs/community-events/ | LV community event posts | Reachable |
| Vegas Local weekend picks | https://vegaslocal.com/ | Weekly LV roundups | Reachable |
| Phoenix New Times food events | https://www.phoenixnewtimes.com/food-drink/ | Weekly Valley food events | Reachable |
| SGWOM monthly guide | https://sgwom.com/news/ | St. George monthly event roundups | Reachable |
| Facebook public events | via web search "site:facebook.com/events" | Organizer events; verify on an official page when possible | Search-only |
| Eventbrite / AllEvents | search by city | Night markets, food truck events | Search-only |

## Lake Havasu City, AZ (added 2026-11-07)
Routing: every Lake Havasu City event goes in `data/lake-havasu-city.json` (id prefix `lh-`, times America/Phoenix, MST with no DST). Do not put Havasu events in the Las Vegas list.
| Name | URL | Covers | Reachable |
|---|---|---|---|
| Go Lake Havasu events | https://www.golakehavasu.com/events/ | Tourism calendar: parades, Winterfest, Balloon Festival | Reachable |
| Lake Havasu City events | https://www.lhcaz.gov/ | City events (Western Winter Blast, parks) | Reachable |
| Havasu News | https://www.havasunews.com/ | Local news event roundups | Search-only |

## Added 2026-11-10
| City | Name | URL | Covers | Reachable |
|---|---|---|---|---|
| Henderson | Cadence Community Association calendar | https://www.cadencecommunityassociation.com/ (calendar month pages) | Central Park bird walks, Paws in the Park, Winter Festival | Reachable |
| Henderson | Lake Las Vegas events | https://www.lakelasvegas.com/events | Chanukah celebration, holiday concert, NYE fireworks | Reachable |
| Henderson / Las Vegas | KNPR Desert Companion "The Guide" | https://knpr.org/desert-companion | Weekly arts/community picks | Reachable |
| Las Vegas | LVCCLD library JSON | https://events.thelibrarydistrict.org/eeventcaldata (see Laughlin row) | All branch events: book sales, kid markets, holiday concerts, free movies | Reachable |
| Las Vegas | Fergusons Downtown | https://www.fergusonsdowntown.com/events0 | Holoholo Market, Small Business Weekend, 702 Market | Reachable |
| Las Vegas | Cars & Coffee: LVC Diner, Das Erbe Gears & Grinds, Celebrity Cars & Coffee | https://carsandcoffeeevents.com/ , https://carcruisefinder.com/ | Recurring car meets | Reachable (secondary; confirm on organizer social pages) |
| Las Vegas | Opportunity Village Magical Forest | https://www.opportunityvillage.org/magical-forest | Holiday lights | Reachable |
| Las Vegas | Glittering Lights (LVMS) | https://www.lvms.com/glittering-lights/ | Drive-through holiday lights | Reachable |
| Las Vegas | Convention calendars | https://vegasconventioncalendar.com/ , https://www.conventionexpomagazine.com/ | Public vs industry shows (DesignerCon, Pokemon Regionals, IBJJF, Irrigation Show) | Reachable |
| Las Vegas | Review-Journal Neon free things | https://www.reviewjournal.com/entertainment/ | Weekly free-things lists | Search-only |
| Las Vegas | FOX5 holiday stories | https://www.fox5vegas.com/ | Ice rinks, tree lightings | Reachable |
| Boulder City | Boulder City Chamber events | https://events.bouldercity.com/ | Best Dam Wine Walk, chamber events | Reachable |
| Boulder City | Boulder City Cruisin Association / carevents.com | https://www.carevents.com/ | Weekly car meetups | Reachable (secondary) |
| St. George | Salt Lake Tribune Southern Utah weekly listings | https://www.sltrib.com/news/2026/11/09/southern-utah-listings-events-week/ (new post each week) | Markets, car shows, art shows, tours in St. George / Cedar / Hurricane | Reachable |
| St. George | Washington County Library (LibCal) | https://washco.libcal.com/ (JSON: /ajax/calendar/list?c=-1&date=YYYY-MM-DD&perpage=100&page=1, one day per call) | Library concerts, karaoke, kids' programs | Reachable |
| St. George | Staheli Family Farm | https://www.stahelifamilyfarm.com/events/ | Live Nativity, light show, Santa | Reachable |
| St. George | St. George Car Shows | https://stgeorgecarshows.com/ | Local car shows (event details in SL Trib/Facebook) | Reachable (homepage only) |
| St. George | Tuacahn Christmas in the Canyon | https://www.tuacahn.org/ | Lights, Live Nativity | Reachable |
| St. George | Be Healthy Utah | https://behealthyutah.com/ | Dixie Convention Center wellness expo | Reachable |
| Cedar City | Cedar City calendar (CivicEngage) | https://www.cedarcityut.gov/Calendar.aspx | City and Heritage Center events | Reachable |
| Cedar City | Iron County Fair / Storybook Parade | https://ironcountyfair.net/ | Storybook Parade, fair events | Reachable |
| Cedar City | SGWOM event pages (SUMA, Messiah) | https://sgwom.com/events/ (sitemap at https://sgwom.com/sitemap.xml lists every event URL) | SUMA First Friday, holiday sale | Reachable |
| Zion / Springdale | SGWOM Springdale event pages | https://sgwom.com/events/springdale-light-parade-and-sweets-social-2026/ | Light Parade, NYE celebration | Reachable |
| Laughlin / Bullhead | Saucy Rossy KCBS AZ | https://saucyrossybbq.com/kcbs/regions/AZ | Slab-O-Rama BBQ (Bullhead City) | Reachable |
| Lake Havasu | Lake Havasu Area Chamber calendar | https://business.havasuchamber.com/community-event-calendar/ | Chamber and community events | Search-only |
| Lake Havasu | RiverScene Magazine | https://riverscenemagazine.com/ | Local event news | Reachable |
| Lake Havasu | Downtown Lake Havasu | https://downtownlakehavasu.com/ | Cruising on Main and downtown events | Reachable (JS-rendered; dates need search) |
| Salt Lake City | Red Butte Garden free events | https://redbuttegarden.org/free-garden-events/ | Holiday Open House & Art Fair, free days | Reachable |
| Salt Lake City | UMFA calendar | https://umfa.utah.edu/ | Holiday Market (admission not stated; not added) | Reachable |
| Los Angeles | Downtown Culver City | https://downtownculvercity.com/ | Tree lighting Sled-tacular | Reachable |
| Los Angeles | Grand Performances | https://www.grandperformances.org/ | Grand Illuminations | Reachable |
| San Diego | sandiego.tips | https://sandiego.tips/ | Parade dates roundup | JS-rendered; not usable directly |

Notes from 2026-11-10: Utah State Parks event slugs change each year (e.g. art-of-adventure-8 -> -9); recheck old links. Brian Head Resort's events page had no upcoming events (opening postponed). Valley of Fire is closed Dec 1-14 for maintenance. redrockcanyonlv.org, cityofhenderson.com, myvscloud, yodel and nowplayingutah block this box (403/520), but their links still work in a browser.
