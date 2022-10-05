/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.coingecko.com/api/v3";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title CoinGecko API V3
 * @version 3.0.0
 * @baseUrl https://api.coingecko.com/api/v3
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  ping = {
    /**
     * @description Check API server status
     *
     * @tags ping
     * @name PingList
     * @summary Check API server status
     * @request GET:/ping
     */
    pingList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/ping`,
        method: "GET",
        ...params,
      }),
  };
  simple = {
    /**
     * No description
     *
     * @tags simple
     * @name PriceList
     * @summary Get the current price of any cryptocurrencies in any other supported currencies that you need.
     * @request GET:/simple/price
     */
    priceList: (
      query: {
        ids: string;
        vs_currencies: string;
        include_market_cap?: string;
        include_24hr_vol?: string;
        include_24hr_change?: string;
        include_last_updated_at?: string;
        precision?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/simple/price`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags simple
     * @name TokenPriceDetail
     * @summary Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
     * @request GET:/simple/token_price/{id}
     */
    tokenPriceDetail: (
      id: string,
      query: {
        contract_addresses: string;
        vs_currencies: string;
        include_market_cap?: string;
        include_24hr_vol?: string;
        include_24hr_change?: string;
        include_last_updated_at?: string;
        precision?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/simple/token_price/${id}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags simple
     * @name SupportedVsCurrenciesList
     * @summary Get list of supported_vs_currencies.
     * @request GET:/simple/supported_vs_currencies
     */
    supportedVsCurrenciesList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/simple/supported_vs_currencies`,
        method: "GET",
        ...params,
      }),
  };
  coins = {
    /**
     * @description Use this to obtain all the coins' id in order to make API calls
     *
     * @tags coins
     * @name ListList
     * @summary List all supported coins id, name and symbol (no pagination required)
     * @request GET:/coins/list
     */
    listList: (query?: { include_platform?: boolean }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/list`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Use this to obtain all the coins market data (price, market cap, volume)
     *
     * @tags coins
     * @name MarketsList
     * @summary List all supported coins price, market cap, volume, and market related data
     * @request GET:/coins/markets
     */
    marketsList: (
      query: {
        vs_currency: string;
        ids?: string;
        category?: string;
        order?: string;
        per_page?: number;
        page?: number;
        sparkline?: boolean;
        price_change_percentage?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/markets`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get current data (name, price, market, ... including exchange tickers) for a coin.<br><br> **IMPORTANT**: Ticker object is limited to 100 items, to get more tickers, use `/coins/{id}/tickers` Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for a while. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
     *
     * @tags coins
     * @name CoinsDetail
     * @summary Get current data (name, price, market, ... including exchange tickers) for a coin
     * @request GET:/coins/{id}
     */
    coinsDetail: (
      id: string,
      query?: {
        localization?: string;
        tickers?: boolean;
        market_data?: boolean;
        community_data?: boolean;
        developer_data?: boolean;
        sparkline?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get coin tickers (paginated to 100 items)<br><br> **IMPORTANT**: Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for a while. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
     *
     * @tags coins
     * @name TickersDetail
     * @summary Get coin tickers (paginated to 100 items)
     * @request GET:/coins/{id}/tickers
     */
    tickersDetail: (
      id: string,
      query?: { exchange_ids?: string; include_exchange_logo?: string; page?: number; order?: string; depth?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/tickers`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get historical data (name, price, market, stats) at a given date for a coin
     *
     * @tags coins
     * @name HistoryDetail
     * @summary Get historical data (name, price, market, stats) at a given date for a coin
     * @request GET:/coins/{id}/history
     */
    historyDetail: (id: string, query: { date: string; localization?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/${id}/history`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul> </b>
     *
     * @tags coins
     * @name MarketChartDetail
     * @summary Get historical market data include price, market cap, and 24h volume (granularity auto)
     * @request GET:/coins/{id}/market_chart
     */
    marketChartDetail: (
      id: string,
      query: { vs_currency: string; days: string; interval?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/market_chart`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul> </b>
     *
     * @tags coins
     * @name MarketChartRangeDetail
     * @summary Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
     * @request GET:/coins/{id}/market_chart/range
     */
    marketChartRangeDetail: (
      id: string,
      query: { vs_currency: string; from: string; to: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/market_chart/range`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get coin info from contract address
     *
     * @tags contract
     * @name ContractDetail
     * @summary Get coin info from contract address
     * @request GET:/coins/{id}/contract/{contract_address}
     */
    contractDetail: (id: string, contractAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
     *
     * @tags contract
     * @name ContractMarketChartDetail
     * @summary Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
     * @request GET:/coins/{id}/contract/{contract_address}/market_chart/
     */
    contractMarketChartDetail: (
      id: string,
      contractAddress: string,
      query: { vs_currency: string; days: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}/market_chart/`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
     *
     * @tags contract
     * @name ContractMarketChartRangeDetail
     * @summary Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) from a contract address
     * @request GET:/coins/{id}/contract/{contract_address}/market_chart/range
     */
    contractMarketChartRangeDetail: (
      id: string,
      contractAddress: string,
      query: { vs_currency: string; from: string; to: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}/market_chart/range`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Candle's body: 1 - 2 days: 30 minutes 3 - 30 days: 4 hours 31 days and beyond: 4 days
     *
     * @tags coins
     * @name OhlcDetail
     * @summary Get coin's OHLC
     * @request GET:/coins/{id}/ohlc
     */
    ohlcDetail: (id: string, query: { vs_currency: string; days: string }, params: RequestParams = {}) =>
      this.request<number[], any>({
        path: `/coins/${id}/ohlc`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all categories
     *
     * @tags categories
     * @name CategoriesListList
     * @summary List all categories
     * @request GET:/coins/categories/list
     */
    categoriesListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/categories/list`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List all categories with market data
     *
     * @tags categories
     * @name CategoriesList
     * @summary List all categories with market data
     * @request GET:/coins/categories
     */
    categoriesList: (query?: { order?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/categories`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  assetPlatforms = {
    /**
     * @description List all asset platforms
     *
     * @tags asset_platforms
     * @name AssetPlatformsList
     * @summary List all asset platforms (Blockchain networks)
     * @request GET:/asset_platforms
     */
    assetPlatformsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/asset_platforms`,
        method: "GET",
        ...params,
      }),
  };
  exchanges = {
    /**
     * @description List all exchanges
     *
     * @tags exchanges
     * @name ExchangesList
     * @summary List all exchanges (Active with trading volumes)
     * @request GET:/exchanges
     */
    exchangesList: (query?: { per_page?: number; page?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Use this to obtain all the markets' id in order to make API calls
     *
     * @tags exchanges
     * @name ListList
     * @summary List all supported markets id and name (no pagination required)
     * @request GET:/exchanges/list
     */
    listList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges/list`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get exchange volume in BTC and tickers<br><br> **IMPORTANT**: Ticker object is limited to 100 items, to get more tickers, use `/exchanges/{id}/tickers` Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for a while. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
     *
     * @tags exchanges
     * @name ExchangesDetail
     * @summary Get exchange volume in BTC and top 100 tickers only
     * @request GET:/exchanges/{id}
     */
    exchangesDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get exchange tickers (paginated)<br><br> **IMPORTANT**: Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for a while. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
     *
     * @tags exchanges
     * @name TickersDetail
     * @summary Get exchange tickers (paginated, 100 tickers per page)
     * @request GET:/exchanges/{id}/tickers
     */
    tickersDetail: (
      id: string,
      query?: { coin_ids?: string; include_exchange_logo?: string; page?: number; depth?: string; order?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/exchanges/${id}/tickers`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get volume_chart data for a given exchange
     *
     * @tags exchanges
     * @name VolumeChartDetail
     * @summary Get volume_chart data for a given exchange
     * @request GET:/exchanges/{id}/volume_chart
     */
    volumeChartDetail: (id: string, query: { days: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges/${id}/volume_chart`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  indexes = {
    /**
     * @description List all market indexes
     *
     * @tags indexes
     * @name IndexesList
     * @summary List all market indexes
     * @request GET:/indexes
     */
    indexesList: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/indexes`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description get market index by market id and index id
     *
     * @tags indexes
     * @name IndexesDetail
     * @summary get market index by market id and index id
     * @request GET:/indexes/{market_id}/{id}
     */
    indexesDetail: (marketId: string, id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/indexes/${marketId}/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description list market indexes id and name
     *
     * @tags indexes
     * @name ListList
     * @summary list market indexes id and name
     * @request GET:/indexes/list
     */
    listList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/indexes/list`,
        method: "GET",
        ...params,
      }),
  };
  derivatives = {
    /**
     * @description List all derivative tickers
     *
     * @tags derivatives
     * @name DerivativesList
     * @summary List all derivative tickers
     * @request GET:/derivatives
     */
    derivativesList: (query?: { include_tickers?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/derivatives`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description List all derivative exchanges
     *
     * @tags derivatives
     * @name ExchangesList
     * @summary List all derivative exchanges
     * @request GET:/derivatives/exchanges
     */
    exchangesList: (query?: { order?: string; per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/derivatives/exchanges`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description show derivative exchange data
     *
     * @tags derivatives
     * @name ExchangesDetail
     * @summary show derivative exchange data
     * @request GET:/derivatives/exchanges/{id}
     */
    exchangesDetail: (id: string, query?: { include_tickers?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/derivatives/exchanges/${id}`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description List all derivative exchanges name and identifier
     *
     * @tags derivatives
     * @name ExchangesListList
     * @summary List all derivative exchanges name and identifier
     * @request GET:/derivatives/exchanges/list
     */
    exchangesListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/derivatives/exchanges/list`,
        method: "GET",
        ...params,
      }),
  };
  nfts = {
    /**
     * @description Use this to obtain all the NFT ids in order to make API calls, paginated to 100 items
     *
     * @tags nfts (beta)
     * @name ListList
     * @summary List all supported NFT ids, paginated by 100 items per page, paginated to 100 items
     * @request GET:/nfts/list
     */
    listList: (
      query?: { order?: string; asset_platform_id?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/nfts/list`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get current data (name, price_floor, volume_24h ...) for an NFT collection. native_currency (string) is only a representative of the currency.
     *
     * @tags nfts (beta)
     * @name NftsDetail
     * @summary Get current data (name, price_floor, volume_24h ...) for an NFT collection
     * @request GET:/nfts/{id}
     */
    nftsDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nfts/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get current data (name, price_floor, volume_24h ...) for an NFT collection
     *
     * @tags nfts (beta)
     * @name ContractDetail
     * @summary Get current data (name, price_floor, volume_24h ...) for an NFT collection
     * @request GET:/nfts/{asset_platform_id}/contract/{contract_address}
     */
    contractDetail: (assetPlatformId: string, contractAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nfts/${assetPlatformId}/contract/${contractAddress}`,
        method: "GET",
        ...params,
      }),
  };
  exchangeRates = {
    /**
     * @description Get BTC-to-Currency exchange rates
     *
     * @tags exchange_rates
     * @name ExchangeRatesList
     * @summary Get BTC-to-Currency exchange rates
     * @request GET:/exchange_rates
     */
    exchangeRatesList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchange_rates`,
        method: "GET",
        ...params,
      }),
  };
  search = {
    /**
     * @description Search for coins, categories and markets listed on CoinGecko ordered by largest Market Cap first
     *
     * @tags search
     * @name SearchList
     * @summary Search for coins, categories and markets on CoinGecko
     * @request GET:/search
     */
    searchList: (query: { query: string }, params: RequestParams = {}) =>
      this.request<
        {
          coins?: { item?: { id?: string; name?: string; symbol?: string; market_cap_rank?: number } };
          exchanges?: { item?: { id?: string; name?: string; market_type?: string } };
          categories?: { item?: { id?: number; name?: string } };
        },
        any
      >({
        path: `/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
     *
     * @tags trending
     * @name TrendingList
     * @summary Get trending search coins (Top-7) on CoinGecko in the last 24 hours
     * @request GET:/search/trending
     */
    trendingList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/search/trending`,
        method: "GET",
        ...params,
      }),
  };
  global = {
    /**
     * @description Get cryptocurrency global data
     *
     * @tags global
     * @name GlobalList
     * @summary Get cryptocurrency global data
     * @request GET:/global
     */
    globalList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/global`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get Top 100 Cryptocurrency Global Eecentralized Finance(defi) data
     *
     * @tags global
     * @name DecentralizedFinanceDefiList
     * @summary Get cryptocurrency global decentralized finance(defi) data
     * @request GET:/global/decentralized_finance_defi
     */
    decentralizedFinanceDefiList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/global/decentralized_finance_defi`,
        method: "GET",
        ...params,
      }),
  };
  companies = {
    /**
     * @description Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
     *
     * @tags companies (beta)
     * @name PublicTreasuryDetail
     * @summary Get public companies data
     * @request GET:/companies/public_treasury/{coin_id}
     */
    publicTreasuryDetail: (coinId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companies/public_treasury/${coinId}`,
        method: "GET",
        ...params,
      }),
  };
}
