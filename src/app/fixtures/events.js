const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_FOOTBALL_BASE;

const fetchConfig = {
  headers: {
    'x-apisports-key': API_KEY,
  },
};

// Fetch all live matches
export async function getLiveMatches() {
  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, fetchConfig);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return null;
  }
}

// Fetch live events timeline (Goals, Cards, Substitutions)
export async function getMatchEvents(fixtureId) {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/events?fixture=${fixtureId}`, fetchConfig);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching match events:', error);
    return null;
  }
}

// Fetch team stats (Possession, Shots, Fouls)
export async function getMatchDetails(fixtureId) {
  try {
    const response = await fetch(
      `${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`,
      fetchConfig,
    );
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
}
