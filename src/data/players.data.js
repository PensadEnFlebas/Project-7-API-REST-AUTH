const players = [
  {
    name: 'Trae Young',
    country: 'USA',
    age: 26,
    height: 6.1,
    position: ['PG'],
    realTeam: 'Atlanta Hawks',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244600/trae_young_ds49u3.png',
    stats: {
      gp: 76,
      min: 36,
      pts: 24.2,
      fgPct: 41.1,
      threePPct: 34,
      reb: 3.1,
      dreb: 2.6,
      oreb: 0.5,
      ast: 11.6,
      stl: 1.2,
      blk: 0.2,
      pf: 1.9,
      plusMinus: 0.4
    },
    userProperty: null
  },
  {
    name: 'Dyson Daniels',
    country: 'Australia',
    age: 22,
    height: 6.7,
    position: ['PG', 'SG'],
    realTeam: 'Atlanta Hawks',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244602/dyson_daniels_ubk0wf.png',
    stats: {
      gp: 76,
      min: 33.8,
      pts: 14.1,
      fgPct: 49.3,
      threePPct: 34,
      reb: 5.9,
      dreb: 4.3,
      oreb: 1.6,
      ast: 4.4,
      stl: 3,
      blk: 0.7,
      pf: 2.3,
      plusMinus: -0.9
    },
    userProperty: null
  },
  {
    name: 'Zaccharie Risacher',
    country: 'France',
    age: 20,
    height: 6.7,
    position: ['SF'],
    realTeam: 'Atlanta Hawks',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244597/zaccharie_risacher_yodxlo.png',
    stats: {
      gp: 75,
      min: 24.6,
      pts: 12.6,
      fgPct: 45.8,
      threePPct: 35.5,
      reb: 3.6,
      dreb: 2.4,
      oreb: 1.1,
      ast: 1.2,
      stl: 0.7,
      blk: 0.5,
      pf: 2,
      plusMinus: -1.6
    },
    userProperty: null
  },
  {
    name: 'Tyrese Maxey',
    country: 'USA',
    age: 24,
    height: 6.2,
    position: ['PG'],
    realTeam: 'Philadelphia 76ers',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244598/tyrese_maxey_kpufre.png',
    stats: {
      gp: 52,
      min: 37.7,
      pts: 26.3,
      fgPct: 43.7,
      threePPct: 35.7,
      reb: 3.3,
      dreb: 3.1,
      oreb: 0.3,
      ast: 6.1,
      stl: 1.8,
      blk: 0.4,
      pf: 2.2,
      plusMinus: -2.4
    },
    userProperty: null
  },
  {
    name: 'Shai Gilgeous-Alexander',
    country: 'Canada',
    age: 26,
    height: 6.6,
    position: ['PG'],
    realTeam: 'Oklahoma City Thunder',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244599/shai_gilgeous_alexander_s7hgmy.png',
    stats: {
      gp: 76,
      min: 34.2,
      pts: 32.7,
      fgPct: 51.9,
      threePPct: 37.5,
      reb: 5,
      dreb: 4.1,
      oreb: 0.9,
      ast: 6.4,
      stl: 1.7,
      blk: 1,
      pf: 2.2,
      plusMinus: 12.1
    },
    userProperty: null
  },
  {
    name: 'Jarrett Allen',
    country: 'USA',
    age: 27,
    height: 6.9,
    position: ['C'],
    realTeam: 'Cleveland Cavaliers',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244600/jarrett_allen_i48dg7.png',
    stats: {
      gp: 82,
      min: 28,
      pts: 13.5,
      fgPct: 70.6,
      threePPct: 0,
      reb: 9.7,
      dreb: 7.1,
      oreb: 2.6,
      ast: 1.9,
      stl: 0.9,
      blk: 0.9,
      pf: 1.5,
      plusMinus: 6.3
    },
    userProperty: null
  },
  {
    name: 'Karl-Anthony Towns',
    country: 'USA',
    age: 29,
    height: 7,
    position: ['PF', 'C'],
    realTeam: 'New York Knicks',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244597/karl_anthony_towns_ttktgk.png',
    stats: {
      gp: 72,
      min: 35,
      pts: 24.4,
      fgPct: 52.6,
      threePPct: 42,
      reb: 12.8,
      dreb: 9.8,
      oreb: 3.1,
      ast: 3.1,
      stl: 1,
      blk: 0.7,
      pf: 3.5,
      plusMinus: 5.3
    },
    userProperty: null
  },
  {
    name: 'Nikola Jokic',
    country: 'Serbia',
    age: 30,
    height: 6.9,
    position: ['C'],
    realTeam: 'Denver Nuggets',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244597/nikola_jokic_brqbpu.png',
    stats: {
      gp: 70,
      min: 36.7,
      pts: 29.6,
      fgPct: 57.6,
      threePPct: 41.7,
      reb: 12.7,
      dreb: 9.9,
      oreb: 2.9,
      ast: 10.2,
      stl: 1.8,
      blk: 0.6,
      pf: 2.3,
      plusMinus: 8.5
    },
    userProperty: null
  },
  {
    name: 'Domantas Sabonis',
    country: 'Lithuania',
    age: 29,
    height: 6.8,
    position: ['PF', 'C'],
    realTeam: 'Sacramento Kings',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244601/domantas_sabonis_roiahh.png',
    stats: {
      gp: 70,
      min: 34.7,
      pts: 19.1,
      fgPct: 59,
      threePPct: 41.7,
      reb: 13.9,
      dreb: 10.1,
      oreb: 3.8,
      ast: 6,
      stl: 0.7,
      blk: 0.4,
      pf: 3.3,
      plusMinus: 2.1
    },
    userProperty: null
  },
  {
    name: 'Brandon Miller',
    country: 'USA',
    age: 22,
    height: 6.7,
    position: ['SF', 'PF'],
    realTeam: 'Charlotte Hornets',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244598/brandon_miller_xmq72m.png',
    stats: {
      gp: 27,
      min: 34.2,
      pts: 21,
      fgPct: 40.3,
      threePPct: 35.5,
      reb: 4.9,
      dreb: 3.9,
      oreb: 0.9,
      ast: 3.6,
      stl: 1.1,
      blk: 0.7,
      pf: 2.7,
      plusMinus: -4.6
    },
    userProperty: null
  },
  {
    name: 'Klay Thompson',
    country: 'USA',
    age: 35,
    height: 6.5,
    position: ['SG'],
    realTeam: 'Dallas Mavericks',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244598/klay_thompson_abupqy.png',
    stats: {
      gp: 72,
      min: 27.3,
      pts: 14,
      fgPct: 41.2,
      threePPct: 39.1,
      reb: 3.4,
      dreb: 2.8,
      oreb: 0.6,
      ast: 2,
      stl: 0.7,
      blk: 0.4,
      pf: 1.1,
      plusMinus: -1.1
    },
    userProperty: null
  },
  {
    name: 'Victor Wembanyama',
    country: 'France',
    age: 21,
    height: 7.3,
    position: ['PF', 'C'],
    realTeam: 'San Antonio Spurs',
    nbaFantasyTeam: null,
    imgURL:
      'https://res.cloudinary.com/dwjwglwsq/image/upload/v1755244597/victor_wembanyama_gjazdb.png',
    stats: {
      gp: 46,
      min: 33.2,
      pts: 24.3,
      fgPct: 47.6,
      threePPct: 35.2,
      reb: 11,
      dreb: 9.2,
      oreb: 1.8,
      ast: 3.7,
      stl: 1.1,
      blk: 3.8,
      pf: 2.3,
      plusMinus: 2.2
    },
    userProperty: null
  }
]

module.exports = players
