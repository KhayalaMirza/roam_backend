//
//  RoamModels.swift
//  Roam
//
//  Backend-in (/v1) qaytardığı bütün cavablar üçün modellər.
//  quicktype ilə real API cavablarından yaradılıb, ekranlara görə qruplaşdırılıb.
//
//  İstifadə:
//      let tours = try JSONDecoder().decode(ToursPage.self, from: data)
//

import Foundation

// MARK: - Ortaq (bütün ekranlarda)

/// Qiymət: hər yerdə hazır göstəriləcək mətnlə gəlir ("980 AZN", "€520", "$576")
struct Money: Codable {
    let amount: Double
    let currency: String          // "AZN", "EUR", "USD"
    let formatted: String
}

/// Qısa istinad: region, ölkə, şəhər ({ id, name })
struct Ref: Codable {
    let id: String
    let name: String
}

/// Seçim: travel type, duration, sort ({ id, label })
struct Option: Codable {
    let id: String
    let label: String
}

struct Coordinate: Codable {
    let lat: Double
    let lng: Double
}

/// Siyahı boş olanda göstərilən mətn
struct EmptyState: Codable {
    let title: String
    let action: String
}

/// Xəta cavabı. `fields` — sahə altında qırmızı mətn üçün (["email": "Enter a valid email address."])
struct APIErrorResponse: Codable {
    let statusCode: Int
    let error: String             // "ValidationError", "LoginRequired", ...
    let message: String
    let fields: [String: String]?
}

// MARK: - Login / Register  (POST /auth/register, /login, /google, /apple, /refresh)

struct AuthResponse: Codable {
    let accessToken: String
    let refreshToken: String
    let expiresIn: Int
    let isNewUser: Bool
    let user: AuthUser
}

struct AuthUser: Codable {
    let id: String
    let fullName: String
    let email: String
    let initials: String
}

// MARK: - Home / Tours siyahısı  (GET /tours)

struct ToursPage: Codable {
    let items: [Tour]
    let page: Int
    let limit: Int
    let total: Int
    let hasMore: Bool
    let currency: String
    let activeFilterCount: Int
    let emptyState: EmptyState?
}

/// Tur kartı (Home, Tours, Favorites, AI planındakı "related tours")
struct Tour: Codable {
    let id: String
    let title: String
    let summary: String
    let region: Ref
    let country: Ref
    let city: Ref
    let locationLabel: String     // "Egypt · Cairo"
    let days: Int
    let nights: Int
    let durationLabel: String     // "5 days / 4 nights"
    let priceAZN: Int
    let price: Money
    let priceLabel: String        // "From 980 AZN / person"
    let travelTypes: [Option]
    let tags: [String]
    let coverImageUrl: String?
    var isFavorite: Bool
}

// MARK: - Filter ekranı  (GET /tours/filters)

struct TourFilters: Codable {
    let regions: [Ref]
    let countries: [FilterCountry]
    let budget: FilterBudget
    let durations: [Option]
    let travelTypes: [Option]
    let sortOptions: [Option]
}

struct FilterCountry: Codable {
    let id: String
    let name: String
    let regionId: String
}

struct FilterBudget: Codable {
    let currency: String
    let min: Int
    let max: Int
    let step: Int
    let minAZN: Int
    let maxAZN: Int
}

// MARK: - Tur detalı  (GET /tours/:id)

struct TourDetail: Codable {
    let id: String
    let title: String
    let summary: String
    let region: Ref
    let country: Ref
    let city: Ref
    let locationLabel: String
    let days: Int
    let nights: Int
    let durationLabel: String
    let priceAZN: Int
    let price: Money
    let priceLabel: String
    let travelTypes: [Option]
    let tags: [String]
    let coverImageUrl: String?
    var isFavorite: Bool
    let description: String
    let breadcrumb: [Ref]
    let cities: [Ref]
    let images: [String]
    let operatorName: String
    let itinerary: [ItineraryDay]
    let stays: [Stay]
    let budget: TourBudget
    let included: [String]
    let excluded: [String]
    let map: TourMap
}

struct ItineraryDay: Codable {
    let day: Int
    let title: String
    let description: String
    let city: Ref
    let items: [ItineraryItem]
}

struct ItineraryItem: Codable {
    let placeId: String
    let name: String
    let category: String
    let durationHours: Double
    let included: Bool
    let isOptional: Bool
    let extraPriceAZN: Int?
    let priceLabel: String
    let coordinate: Coordinate?

    enum CodingKeys: String, CodingKey {
        case placeId, name, category, durationHours, included
        case isOptional = "optional"
        case extraPriceAZN, priceLabel, coordinate
    }
}

struct TourBudget: Codable {
    let packagePrice: Money
    let packagePriceAZN: Int
    let childPrice: Money
    let childPriceAZN: Int
    let perLabel: String
    let optionalExtras: [OptionalExtra]
}

struct OptionalExtra: Codable {
    let name: String
    let day: Int
    let price: Money
    let priceAZN: Int
}

struct TourMap: Codable {
    let points: [MapPoint]
}

struct MapPoint: Codable {
    let kind: String              // "place" və ya "stay"
    let id: String
    let name: String
    let day: Int?
    let lat: Double
    let lng: Double
}

/// Otel / qalınacaq yer (Tur detalı və Şəhər detalı)
struct Stay: Codable {
    let id: String
    let name: String
    let kind: String
    let stars: Int?
    let description: String
    let pricePerNight: Money?
    let pricePerNightAZN: Int?
    let websiteUrl: String?
    let imageUrl: String?
    let coordinate: Coordinate?
    let nights: Int?              // yalnız tur detalında
    let city: Ref?                // yalnız tur detalında
}

// MARK: - Countries ekranı  (GET /regions, GET /countries)

typealias Regions = [Ref]
typealias Countries = [Country]

struct Country: Codable {
    let id: String
    let name: String
    let region: Ref
    let imageUrl: String?
    let cityCount: Int
    let subtitle: String          // "3 cities"
    let tourCount: Int
}

// MARK: - Ölkə detalı  (GET /countries/:id)

struct CountryDetail: Codable {
    let id: String
    let name: String
    let region: Ref
    let imageUrl: String?
    let cityCount: Int
    let subtitle: String
    let tourCount: Int
    let description: String
    let info: [InfoItem]
    let currency: String
    let language: String
    let bestSeason: String
    let cities: [City]
}

struct InfoItem: Codable {
    let title: String
    let value: String
}

/// Şəhər kartı (ölkə detalında)
struct City: Codable {
    let id: String
    let name: String
    let shortDescription: String
    let imageUrl: String?
    let recommendedDays: Int
    let dailyBudget: Money
    let dailyBudgetAZN: Int
    let tourCount: Int
}

// MARK: - Şəhər detalı  (GET /cities/:id)

struct CityDetail: Codable {
    let id: String
    let name: String
    let shortDescription: String
    let imageUrl: String?
    let recommendedDays: Int
    let dailyBudget: Money
    let dailyBudgetAZN: Int
    let tourCount: Int
    let description: String
    let country: Ref
    let region: Ref
    let recommendedStayLabel: String
    let dailyBudgetLabel: String
    let dailyBudgetNote: String
    let dailyBudgetBreakdown: DailyBudgetBreakdown
    let transport: [String]
    let coordinate: Coordinate?
    let places: [Place]
    let stays: [Stay]
}

struct DailyBudgetBreakdown: Codable {
    let stay: Money
    let food: Money
    let transport: Money
    let activities: Money
}

// MARK: - Məkan detalı  (GET /places/:id)

struct Place: Codable {
    let id: String
    let name: String
    let category: String
    let description: String
    let durationHours: Double
    let priceAZN: Int
    let price: Money?             // pulsuzdursa nil
    let priceLabel: String        // "+25 AZN" və ya "Free"
    let city: Ref?
    let country: Ref?
    let imageUrl: String?
    let coordinate: Coordinate?
    var isFavorite: Bool
}

// MARK: - Favorites ekranı  (GET /favorites)

struct FavoritesResponse: Codable {
    let counts: FavoriteCounts
    let tours: [FavoriteTour]
    let places: [FavoritePlace]
    let currency: String
    let emptyState: EmptyState?
}

struct FavoriteCounts: Codable {
    let tours: Int
    let places: Int
}

struct FavoriteTour: Codable {
    let favoriteId: String
    let addedAt: String
    let tour: Tour
}

struct FavoritePlace: Codable {
    let favoriteId: String
    let addedAt: String
    let place: Place
}

// MARK: - Request göndər  (GET /requests/quote)

struct Quote: Codable {
    let tourId: String
    let lines: [QuoteLine]
    let total: Money
    let totalAZN: Int
    let totalInAZN: Money
    let note: String
}

struct QuoteLine: Codable {
    let label: String             // "980 AZN × 2 adults"
    let amount: Money
}

// MARK: - My Requests  (GET /requests, GET/POST /requests/:id)

struct RequestsResponse: Codable {
    let counts: RequestCounts
    let items: [TourRequest]
    let disclaimer: String
}

struct RequestCounts: Codable {
    let all: Int
    let pending: Int
    let confirmed: Int
    let past: Int
}

/// Göndərilmiş sorğu (POST /requests cavabı, siyahı elementi, detal)
struct TourRequest: Codable {
    let id: String
    let code: String              // "TR-2481"
    let status: String            // "pending", "confirmed", "cancelled", ...
    let statusLabel: String
    let isPast: Bool
    let tour: RequestTour
    let startDate: String?
    let endDate: String?
    let flexible: Bool
    let datesLabel: String
    let adults: Int
    let children: Int
    let travelersLabel: String
    let contactPhone: String
    let contactEmail: String
    let note: String?
    let total: Money
    let totalAZN: Int
    let operatorNote: String?
    let createdAt: String
    let updatedAt: String
    let disclaimer: String
    let nextSteps: [NextStep]?    // yalnız göndərildikdən sonra
    let noPaymentNote: String?
}

struct RequestTour: Codable {
    let id: String
    let title: String
    let country: Ref
    let city: Ref
    let durationLabel: String
    let coverImageUrl: String?
}

/// "What happens next" addımları
struct NextStep: Codable {
    let step: Int
    let title: String
    let body: String
}

// MARK: - Profile  (GET/PATCH /me, PUT /me/preferences)

struct Me: Codable {
    let id: String
    let fullName: String
    let email: String
    let initials: String
    let phone: String?
    let currency: String
    let notificationsEnabled: Bool
    let language: String
    let role: String
    let authProviders: [String]
    let hasPassword: Bool
    let preferences: TravelPreferences
    let stats: ProfileStats
    let createdAt: String
}

struct TravelPreferences: Codable {
    let regions: [Ref]
    let budgetMinAZN: Int?
    let budgetMaxAZN: Int?
    let budgetMin: Money?
    let budgetMax: Money?
    let travelTypes: [Option]
}

struct ProfileStats: Codable {
    let requests: RequestStats
    let favorites: FavoriteCounts
}

struct RequestStats: Codable {
    let total: Int
    let pending: Int
    let label: String
}

// MARK: - Valyuta kursları  (GET /rates)

struct Rates: Codable {
    let base: String
    let rates: [String: Double]   // ["AZN": 1, "USD": 0.5882, "EUR": 0.5051]
    let aznPer: [String: Double]  // ["AZN": 1, "USD": 1.7, "EUR": 1.98]
    let rateDate: String
    let source: String
    let updatedAt: String
}

// MARK: - AI Discover  (GET /ai/discover, GET /ai/plans)

struct AIDiscover: Codable {
    let title: String
    let prompt: String
    let examples: [String]
    let plans: [SavedPlan]
}

typealias SavedPlans = [SavedPlan]

/// "Your plans" siyahısındakı kart
struct SavedPlan: Codable {
    let id: String
    let title: String
    let subtitle: String          // "5 days · 2 people"
    let estimatedTotal: Money
    let cities: [Ref]
    let createdAt: String
}

// MARK: - AI Chat  (POST /ai/chat)

struct ChatResponse: Codable {
    let reply: String
    let quickReplies: [String]
    let slots: Slots
    let slotChips: [SlotChip]
    let missingSlots: [String]
    let readyToPlan: Bool
    let plan: Plan?
    let remainingToday: Int
    let engine: String
}

/// Planlayıcının topladığı məlumat. Növbəti /ai/chat sorğusunda geri göndərilir.
struct Slots: Codable {
    let destination: String?
    let travelers: Int?
    let durationDays: Int?
    let budgetAZN: Int?
    let travelTypes: [String]
    let departureCity: String?
    let dates: TripDates?
    let flightsIncluded: Bool?
}

struct TripDates: Codable {
    let flexible: Bool
    let start: String?
    let end: String?
}

struct SlotChip: Codable {
    let key: String
    let label: String             // "2 people"
}

// MARK: - AI Plan  (chat-dakı plan, POST /ai/plans, GET /ai/plans/:id)

struct Plan: Codable {
    let id: String?               // saxlanmayıbsa nil
    let saved: Bool
    let title: String
    let summary: String
    let label: String
    let days: Int
    let travelers: Int
    let flightsIncluded: Bool
    let departureCity: String
    let subtitle: String
    let currency: String
    let estimatedTotal: Money
    let estimatedTotalAZN: Int
    let estimatedTotalLabel: String
    let userBudget: Money?
    let withinBudget: Bool?
    let breakdown: [BudgetLine]
    let cities: [Ref]
    let dayPlans: [DayPlan]
    let relatedTours: [Tour]
    let note: String
    let draft: PlanDraft
    let slots: Slots
    let createdAt: String?
}

struct BudgetLine: Codable {
    let key: String               // "stay", "food", "transport", "activities"
    let label: String
    let amountAZN: Int
    let amount: Money
}

struct DayPlan: Codable {
    let day: Int
    let city: Ref
    let title: String
    let notes: String?
    let items: [DayPlanItem]
}

struct DayPlanItem: Codable {
    let placeId: String
    let name: String
    let category: String
    let durationHours: Double
    let priceAZN: Int
    let price: Money?
    let priceLabel: String
    var isFavorite: Bool
}

/// "Save plan" zamanı POST /ai/plans-a geri göndərilir
struct PlanDraft: Codable {
    let title: String
    let summary: String
    let days: [DraftDay]
    let relatedTourIds: [String]
}

struct DraftDay: Codable {
    let day: Int
    let cityId: String
    let title: String
    let placeIds: [String]
    let notes: String?
}
