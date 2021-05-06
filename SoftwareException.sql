
CREATE TABLE [dbo].[SoftwareException](
	[SoftwareExceptionId] [int] IDENTITY(1,1) NOT NULL,
	[ExceptionName] [nvarchar](500) NULL,
	[CustomerId] [int] NOT NULL,
	[InitiationDate] [datetime] NULL,
	[ExpirationDate] [datetime] NULL,
	[Initiator] [nvarchar](500) NULL,
	[ProductOwner] [nvarchar](500) NULL,
	[WorkstationScope] [nvarchar](500) NULL,
	[SoftwareVersionId] [int] NOT NULL,
	[ReleaseDate] [datetime] NULL,
	[CvssScore] [decimal](18, 2) NULL,
	[SeverityLevel] [nvarchar](50) NULL,
	[Reason] [nvarchar](500) NULL,
	[BusinessRiskAssessment] [nvarchar](500) NULL,
	[Decision] [varchar](500) NULL,
	[ExceptionDate] [datetime] NULL,
	[IsDeleted] [bit] NOT NULL,
	[Log] [ntext] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedOnDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedOnDate] [datetime] NULL,
 CONSTRAINT [PK_SoftwareException] PRIMARY KEY CLUSTERED 
(
	[SoftwareExceptionId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[SoftwareException] ADD  CONSTRAINT [DF_SoftwareException_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO


