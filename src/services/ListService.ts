import { ListModelSelect } from "@/models/ListModel";
import { apiUrl } from "@/utils/api"
import axios from "@/utils/axios";
import { AxiosResponse } from "axios"
import { LoadOptions } from 'react-select-async-paginate';

export const getAllLists = async() => {
    const response: AxiosResponse = await axios.get(apiUrl.getAllLists);
    return response.data;
}

export const getAllCommunes = async(page:number ,page_size: number, inputValue:string) => {
    const response: AxiosResponse = await axios.get(apiUrl.getAllCommunes, {     
        params: {
            page,
            page_size: page_size,
            search: inputValue,
      },});
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadOptionsCommunes: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
  inputValue: string,
  { page }: { page: number }
) => {
  try {
    const response = await getAllCommunes(page, 50, inputValue);

    return {
      options: response.communes.map((commune: ListModelSelect) => ({
        value: commune.value,
        label: commune.label.charAt(0).toUpperCase() + commune.label.slice(1).toLowerCase(),
      })),
      hasMore: response.hasMore, // If more towns exist, allow scrolling
      additional: { page: response.nextPage || 1 }, // Fetch next page if needed
    };
  } catch (error) {
    console.error("Error loading communes:", error);
    return { options: [], hasMore: false };
  }
};

export const getAllTowns = async(page:number ,page_size: number, inputValue:string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getAllTowns, {     
      params: {
          page,
          page_size: page_size,
          search: inputValue,
    },});
  return response.data;
}

export const loadOptionsTowns: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
  inputValue: string,
  { page }: { page: number }
) => {
  try {
    const response = await getAllTowns(page, 50, inputValue);

    return {
      options: response.towns.map((town: ListModelSelect) => ({
        value: town.value,
        label: town.label.charAt(0).toUpperCase() + town.label.slice(1).toLowerCase(),
      })),
      hasMore: response.hasMore,
      additional: { page: response.nextPage || 1 },
    };
  } catch (error) {
    console.error("Error loading towns:", error);
    return { options: [], hasMore: false };
  }
};

export const getAllLanguages = async(page:number ,page_size: number, inputValue:string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getAllLanguages, {     
      params: {
          page,
          page_size: page_size,
          search: inputValue,
    },});
  return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadOptionsLanguagesAide: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
  inputValue: string,
  loadedOptions: any,
  additional: { page: number }
) => {
  try {
    const currentPage = additional?.page || 1;
        
    const response = await getAllLanguages(currentPage, 20, inputValue);
        
    const options = response.languages.map((language: ListModelSelect) => ({
      value: language.value,
      label: language.label.toLowerCase(),
    }));

    return {
      options,
      hasMore: response.hasMore,
      additional: { 
        page: currentPage + 1  // Always increment for next call
      },
    };
  } catch (error) {
    console.error("Error loading languages:", error);
    return { 
      options: [], 
      hasMore: false, 
      additional: { page: 1 } 
    };
  }
};



export const loadOptionsLanguagesFM: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
  inputValue: string,
  { page }: { page: number }
) => {
  try {
    const response = await getAllLanguages(page, 20, inputValue);

    let options = response.languages.map((language: ListModelSelect) => ({
      value: language.value,
      label: language.label.toLowerCase(),
    }));

    options = [{ value: "blank", label: "indifférent" }, ...options];    

    return {
      options,
      hasMore: response.hasMore,
      additional: { page: response.nextPage || 1 },
    };
  } catch (error) {
    console.error("Error loading languages:", error);
    return { options: [], hasMore: false };
  }
};

export const getAllNationalities = async(page:number ,page_size: number, inputValue:string) => {
  const response: AxiosResponse = await axios.get(apiUrl.getAllNationalities, {     
      params: {
          page,
          page_size: page_size,
          search: inputValue,
    },});
  return response.data;
}

// Update your load function
export const loadOptionsNationalitiesAide: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
    inputValue: string,
    loadedOptions: any,
    { page }: { page: number }
) => {
  try {
    // If we're on page 1 and there are loaded options, it means we're reopening
    // the dropdown - AsyncPaginate bug causes accumulation
    console.log('Loading nationalities - Page:', page, 'Input:', inputValue, 'Loaded:', loadedOptions?.length || 0);

    const response = await getAllNationalities(page, 20, inputValue);

    const options = response.nationalities.map((nationality: ListModelSelect) => ({
      value: String(nationality.value),
      label: nationality.label.toLowerCase(),
    }));

    return {
      options,
      hasMore: response.hasMore,
      additional: { page: page + 1 },
    };
  } catch (error) {
    console.error("Error loading nationalities:", error);
    return { options: [], hasMore: false, additional: { page: 1 } };
  }
};

export const loadOptionsNationalitiesFM: LoadOptions<{ value: string; label: string }, any, { page: number }> = async (
    inputValue: string,
    loadedOptions: any, // Add this parameter to track what's already loaded
    { page }: { page: number }
) => {
  try {
    const response = await getAllNationalities(page, 20, inputValue);

    let options = response.nationalities.map((nationality: ListModelSelect) => ({
      value: String(nationality.value), // Convert to string for consistency
      label: nationality.label.toLowerCase(),
    }));

    // Only add "indifférent" on the FIRST page
    if (page === 1) {
      options = [{ value: "blank", label: "indifférent" }, ...options];
    }

    return {
      options,
      hasMore: response.hasMore,
      additional: { page: page + 1 }, // Use page + 1 instead of nextPage
    };
  } catch (error) {
    console.error("Error loading nationalities:", error);
    return { options: [], hasMore: false, additional: { page: 1 } };
  }
};