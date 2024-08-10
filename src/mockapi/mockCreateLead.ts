'use client'

/**
 * Mock the Create lead API endpoint for the frontend using localStorage
 */

// Function to mock the Create lead API endpoint
export const mockCreateLead = (leadData: any) => {
  // Check if localStorage is available
  if (typeof localStorage !== 'undefined') {
    // Get the existing leads from localStorage
    const existingLeads = localStorage.getItem('leads');

    // Parse the existing leads JSON string
    const parsedLeads = existingLeads ? JSON.parse(existingLeads) : [];

    // Generate a unique ID for the new lead
    const newLeadId = Math.random().toString(36).substring(7);

    // Create a new lead object with the provided data and generated ID
    const newLead = {
      id: newLeadId,
      ...leadData,
    };

    // Add the new lead to the existing leads array
    parsedLeads.push(newLead);

    // Update the leads in localStorage
    localStorage.setItem('leads', JSON.stringify(parsedLeads));

    // Return the new lead object
    return newLead;
  }

  // Return null if localStorage is not available
  return null;
};
