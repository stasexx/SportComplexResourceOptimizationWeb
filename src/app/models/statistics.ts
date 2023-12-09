export interface UserUsageStatistic {
    equipmentId: string
    equipmentName: string
    totalUsageTime: string
  }
  
export interface EquipmentUsage {
    hour: number
    reservationCount: number
  }

export interface ServiceUsage {
    equipmentName: string
    reservationCount: number
  }